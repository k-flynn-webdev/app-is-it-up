const m_job = require('../models/job.js')
const logger = require('../helpers/logger.js')
const has = require('../helpers/has.js')

let has_init = false
let delay_load_jobs = 5

function init (app) {
	if (!has_init) {
		has_init = true
	}

	app.on('db-on', delayStart)
	return app
}

exports.init = init

let stackInit = false
const stackGlobal = []

function delayStart () {
	setTimeout(() => {
		loadStack()
	}, delay_load_jobs * 1000)
}

/**
 * Load all jobs into memory for ease of access ..
 */
function loadStack () {
	if (stackInit) {
		return
	}

	m_job.find({})
		.then(result => {
			result.filter(item => {
				if (item.active) {
					stackGlobal.push(item)
				}
			})

			stackInit = true
			logger.log(`Jobs loaded: ${stackGlobal.length}`)
		})
		.catch(err => {
			loggger.log(err)
		})
}

/**
 * Returns current jobs in stack based on auth role
 *
 * @param {Object}		auth		user token
 * @returns {Promise}	array		array of jobs
 */
function getStack (auth) {

	let resultVar = []

	if (!auth) {
		resultVar = stackGlobal.filter(item => item.active && !item.user.id)
	} else {
		if (has.contains(auth.role, 'user')) {
			let authId = auth.id.toString()
			resultVar = stackGlobal.filter(item =>
				item.user.id && item.user.id.toString() === authId)
		}

		if (has.contains(auth.role, 'admin') ||
			has.contains(auth.role, 'dev')) {
			resultVar = stackGlobal.filter(item => item)
		}
	}

	return Promise.resolve(resultVar)
}

exports.getStack = getStack

/**
 * Returns index of a job, -1 if not found
 *
 * @param {Object} 		job
 * @returns {number}
 */
function checkStack (job) {
	for (let i = 0, max = stackGlobal.length; i < max; i++) {
		if (stackGlobal[i].job_hash === job.job_hash) {
			return i
		}
	}
	return -1
}

/**
 * Adds a job to the stack and returns it's index,
 * 	-1 if no action was taken
 *
 * @param {Object} 		job
 * @returns {Number}
 */
function addStack (job) {
	if (checkStack(job) < 0) {
		stackGlobal.push(job)
		return stackGlobal.length
	}
	return -1
}

exports.addStack = addStack

/**
 * Removes a job from the stack and returns it's index,
 * 	-1 if no action was taken
 *
 * @param {Object} 		job
 * @returns {Number}
 */
function removeStack (job) {
	let index = checkStack(job)
	if (index !== -1) {
		stackGlobal.splice(index, 1)
		return index
	}
	return -1
}

exports.removeStack = removeStack


/**
 * Updates a job on the stack with the new job, returns the index
 * 	-1 if no action was taken
 *
 * @param {Object} 		job
 * @returns {Number}
 */
function updateStack (job) {
	let index = checkStack(job)
	if (index === -1) {
		return index
	}

	stackGlobal[index] = job
	return index
}

exports.updateStack = updateStack




