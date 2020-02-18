const m_job = require('../models/job.js')
// const exit = require('../services/exit.js')
const logger = require('../helpers/logger.js')
const has = require('../helpers/has.js')

function jobUpdate (job, update, auth) {
	if (auth) {
		job.user.name = auth.name
		job.user.id = auth.id
	}
	if (has.item(update.name)) {
		job.name = update.name
	}
	if (has.item(update.url)) {
		job.setUrl(update.url)
	}
	if (has.item(update.method)) {
		job.setMethod(update.method)
	}
	if (has.item(update.ping)) {
		job.setPing(update.ping)
	}
}

function create ({ job, auth }) {

	let newJob = new m_job()

	try {
		jobUpdate(newJob, job, auth)
	} catch (e) {
		return Promise.reject(e)
	}

	newJob.setJobHash()

	return m_job.findOne({ job_hash: newJob.job_hash })
		.then(res => {
			if (res) {
				throw new Error('A duplicate job already exists')
			}
			return newJob.save()
		})
		.catch(err => {
			logger.log(err)
			throw err
		})
}

exports.create = create

function update ({ job, auth }) {

	return m_job.findOne({ job_hash: job.job_hash })
		.then(res => {
			if (!res) {
				throw new Error('Job wasn\'t found.')
			}

			jobUpdate(res, job, auth)

			return res.save()
		})
		.catch(err => {
			logger.log(err)
			throw err
		})
}

exports.update = update

/**
 * Check permission of a job against a token
 *
 * @param {Object}	job
 * @param {String}	token
 * @returns {Promise}
 */
function permission (job, token) {

	if (token && token.role && token.role === 'admin') {
		return Promise.resolve(job)
	}

	let jobHasUserId = false
	if (job.user && job.user.id) {
		jobHasUserId = true
	}

	let tokenHasId = false
	if (token && token.id) {
		tokenHasId = true
	}

	// public job
	if (!jobHasUserId) {
		return Promise.resolve(job)
	}

	// user role find ..
	if (jobHasUserId) {
		if (!tokenHasId) {
			throw Error('Job belongs to user with a different ID')
		}
		if (req.body.token.id.toString() === result.user.id.toString()) {
			return Promise.resolve(job)
		} else {
			throw Error('Job belongs to user with a different ID')
		}
	}
}

exports.permission = permission