const m_job = require('../models/job.js')
const m_ping = require('../models/ping.js')
const logger = require('../helpers/logger.js')
const has = require('../helpers/has.js')
const jobStack = require('./jobStack.js')

const PLAY = 'play'
const STOP = 'stop'

let delay_load_jobs = 10
let delay_job_rounds = 1000 * 20

let loop_init = null
let loop_time = null
let loop_timeOut = null
let loop_rounds = 0
/**
 * lifetime job count
 */
let loop_count = 0
let loop_current = 0
let loop_mode = ''
let loop_jobs = null


function delayStart () {
	setTimeout(() => {
		startLoop()
	}, delay_load_jobs * 1000)
}

function init (app) {
	if (!loop_init) {
		loop_init = true
		loop_time = Date.now()
	}

	app.on('db-on', delayStart)
	return app
}

exports.init = init


function startLoop () {
	console.log('start job loop')
	loop_mode = PLAY
	// setupLoop()	// todo still testing
}
function stopLoop () {
	console.log('stop job loop')
	loop_mode = STOP
}

/**
 * Sets up the jobs to be executed locally
 */
function setupLoop (rounds = 0) {
	loop_rounds = rounds
	loop_current = 0
	loop_jobs = jobStack.stack()

	executeLoop()

	function executeLoop () {
		execute(loop_jobs[loop_current])

		if (loop_current < loop_jobs.length && loop_mode === PLAY) {
			loop_count +=1
			loop_current +=1
			executeLoop()
		}
	}

	console.log('loop finished')
	// todo time setup here
	nextLoop()
}

function nextLoop () {
	console.log('into loop')
	clearTimeout(loop_timeOut)

	if (loop_mode === PLAY) {
		loop_rounds +=1
		loop_timeOut = setTimeout(() => {
			console.log('next loop')
			setupLoop(loop_rounds)
		}, delay_job_rounds)
	}
}


/**
 * Returns the result of a job execution
 * @param {Object} job
 */
function execute (job) {
	if (job && job.job_hash) {
		console.log(`round: ${loop_rounds} index: ${loop_current} count: ${loop_count}`)
		return true
	}
	return false
}
exports.execute = execute



