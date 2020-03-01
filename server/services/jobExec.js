const request = require('request')
const m_job = require('../models/job.js')
const m_ping = require('../models/ping.js')
const logger = require('../helpers/logger.js')
const config = require('../config/config.js')
const has = require('../helpers/has.js')
const jobStack = require('./jobStack.js')

const PLAY = 'play'
const STOP = 'stop'

let delay_load_jobs = 10
let delay_job_rounds = config.time_delay

let loop_mode = ''
let loop_init = null
let loop_time = null
let loop_timeOut = null
let loop_rounds = 0
/**
 * lifetime job count
 */
let loop_count = 0
let loop_current = 0
let loop_jobs = null
let loop_timeNow = null

function init (app) {
	if (!loop_init) {
		loop_init = true
		loop_time = Date.now()
	}

	app.on('db-on', delayStart)
	app.on('stack-start', startLoop)
	app.on('stack-stop', stopLoop)
	return app
}

exports.init = init

function delayStart () {
	setTimeout(() => {
		startLoop()
	}, delay_load_jobs * 1000)
}

function startLoop () {
	logger.log('start job loop')
	loop_mode = PLAY
	setupRound()	// todo still testing
}

function stopLoop () {
	logger.log('stop job loop')
	loop_mode = STOP
}

/**
 * Sets up the jobs to be executed locally each time
 */
function setupRound (rounds = 0) {
	loop_rounds = rounds
	loop_current = 0
	loop_jobs = jobStack.stack()
	loop_timeNow = Date.now()
	executeRound()
}

function executeRound () {
	if (loop_current < loop_jobs.length && loop_mode === PLAY) {
		executeJob(loop_jobs[loop_current], () => {
			nextJob()
			executeRound()
		})
	} else {
		nextRound()
	}
}

function nextRound () {
	clearTimeout(loop_timeOut)

	if (loop_mode === PLAY) {
		loop_rounds += 1
		loop_timeOut = setTimeout(() => {
			setupRound(loop_rounds)
		}, delay_job_rounds * 1000)
	} else {
		logger.log('closing loop')
	}
}

function nextJob () {
	loop_count += 1
	loop_current += 1
}

function updateJobTick (job) {
	let future = 1000 * 60 * job.ping
	job.tick.num += 1
	job.tick.total += 1
	if (job.tick.num > job.tick.max) {
		job.tick.num = 0
	}

	job.tick.next = Date.now() + future
}

function updateJobError (job, error) {
	logger.log(error)
	job.status = false

	let newPing = new m_ping({
		url: job.url,
		status: 0,
		date: loop_timeNow,
		job_hash: job.job_hash,
		user: job.user && job.user.id ? job.user.id : null
	})

	job.fails.push(newPing._id)
	newPing.save()
}

function updateJobSuccess (job, success) {
	// todo update health, timings etc here

	job.status = true
}

function updateJobHealth (job, start, end, status) {
	let healthItem = { response: end - start, time: Date.now(), status: status }
	job.health.unshift(healthItem) // add to start

	// remove end
	if (job.health.length > 99) {
		job.health.splice(99, job.health.length - 100)
	}
}

/**
 * Returns the result of a job execution
 * @param {Object} job
 */
function executeJob (job, cb) {
	let isJobReady = loop_timeNow >= new Date(job.tick.next)

	if (isJobReady && job && job.url) {
		let startTime = Date.now()
		let endTime = null

		logger.log(`Url: ${job.url} Time: ${new Date().toISOString()}`)
		request({ url: job.url, method: job.method, json: true },
			function (error, result) {
				endTime = Date.now()
				let statusCode = 0

				if (error) {
					updateJobError(job, error)
				} else {
					statusCode = result.statusCode || 0
					updateJobSuccess(job, result)
				}

				updateJobTick(job)
				updateJobHealth(job, startTime, endTime, statusCode)

				job.save((error, result) => {

					if (error) {
						logger.log(error)
					}

					return cb()
				})
			})
	} else {
		return cb()
	}
}




