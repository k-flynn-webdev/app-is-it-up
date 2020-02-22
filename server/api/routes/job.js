const m_job = require('../../models/job.js')
const m_user = require('../../models/user.js')
const m_ping = require('../../models/ping.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../helpers/logger.js')
const job = require('../../services/job.js')
const jobStack = require('../../services/jobStack.js')
const jobMiddle = require('../middlewares/job.js')
const token = require('../../services/token.service.js')

// const token = require('../middlewares/token.service.js')
// const api_job_get = require('../logic/job/api.job.get.js')
// const api_job_create = require('../logic/job/api.job.create.js')
// const api_job_update = require('../logic/job/api.job.update.js')
// const api_job_remove = require('../logic/job/api.job.remove.js')
// const api_job_shared = require('../logic/job/api.job.shared.js')
// const pings = require('../../services/pings/pings.funcs.js')

// const api_job_stack = require('../../services/jobs/jobs.array.js')
// const exit = require('../middlewares/exit.js')

// function isVerifiedMsg (auth) {
// 	if (auth && auth.meta) {
// 		return 'User email needs to be verified.'
// 	}
// 	return null
// }

// todo make sure owner is valid & exists ...

module.exports = function (app) {

	app.get('/api/job/all', token.passive, function (req, res) {

		jobStack.getStack(req.body.token)
			.then(result => {

				// todo , what happens when 0 jobs?

				let safeJobs = result.map(item => item.safeExport())
				return exit(res, 200, 'Success jobs found.', { jobs: safeJobs })
			})
			.catch(err => {
				logger.log(err)
				return exit(res, 422, err.message, err)
			})
	})

	app.post('/api/job/create', token.passive, jobMiddle.create, jobMiddle.prepare, function (req, res) {

		let newJob = null
		let newJobIndex = -1

		function updateUser (req) {
			let userPromise = Promise.resolve()
			if (req.body.token && req.body.token.id) {
				userPromise = m_user.findOne({ _id: req.body.token.id })
					.then(user => {
						user.jobs.push(newJob.job_hash)
						return user.save()
					})
			}
			return userPromise
		}

		job.create({ job: req.body, auth: req.body.token })
			.then(result => {
				newJob = result

				newJobIndex = jobStack.addStack(newJob)
				if (newJobIndex === -1) {
					throw Error('Job created was not added to the stack')
				}

				return updateUser(req)
			})
			.then(() => {
				return exit(res, 201, `Success new job created (${newJobIndex}).`,
					{ job: newJob.safeExport() })
			})
			.catch(err => {
				logger.log(err)
				return exit(res, 422, err.message || err, err)
			})
	})

	app.get('/api/job/:job_hash', token.passive, jobMiddle.get, jobMiddle.prepare, function (req, res) {

		m_job.findOne({ job_hash: req.params.job_hash })
			.then(result => {

				if (!result) {
					throw Error('No jobs with that ID found.')
				}

				return job.permission(result, req.body.token)
			})
			.then(result => {
				return exit(res, 200, 'Success job found.',
					{ job: result.safeExport() })
			})
			.catch(err => {
				logger.log(err)
				return exit(res, 404, err.message || err, err)
			})
	})

	app.patch('/api/job/:job', token.passive, jobMiddle.update, jobMiddle.prepare, function (req, res) {

		let jobUpdated = null
		let jobStackIndex = -1

		job.update({ job: req.body, auth: req.body.token })
			.then(result => {
				jobUpdated = result

				jobStackIndex = jobStack.updateStack(jobUpdated)
				if (jobStackIndex === -1) {
					throw Error('Job updated was not found on the stack')
				}

				return exit(res, 201, `Success job updated (${jobStackIndex}).`,
					{ job: jobUpdated.safeExport() })
			})
			.catch(err => {
				logger.log(err)
				return exit(res, 422, err.message || err, err)
			})
	})

	app.delete('/api/job/:job_hash', token.passive, jobMiddle.get, jobMiddle.prepare, function (req, res) {

		let jobResult = null
		let jobDeleted = null
		let pingsDeleted = null
		let stackDeleted = null

		function updateUser (req) {
			let userPromise = Promise.resolve()
			if (req.body.token && req.body.token.id) {
				userPromise = m_user.findOne({ _id: req.body.token.id })
					.then(user => {
						user.jobs = user.jobs.filter(item => item.job_hash !== req.params.job_hash)
						return user.save()
					})
			}
			return userPromise
		}

		m_job.findOne({ job_hash: req.params.job_hash })
			.then(result => {

				if (!result) {
					throw Error('No jobs with that ID found.')
				}

				return job.permission(result, req.body.token)
			})
			.then(result => {
				jobResult = result
				return result.deleteOne()
			})
			.then(result => {
				jobDeleted = result
				return updateUser(req)
			})
			.then(() => {
				return m_ping.deleteMany({ job_hash: jobResult.job_hash })
			})
			.then(result => {
				pingsDeleted = result
				return jobStack.removeStack(jobDeleted)
			})
			.then(result => {
				stackDeleted = result

				return exit(res, 200, 'Success job removed.',
					{
						job: {},
						deletion: {
							job: jobDeleted.safeExport(),
							pings: pingsDeleted,
							stack: stackDeleted
						}
					})
			})
			.catch(err => {
				logger.log(err)
				return exit(res, 404, err.message || err, err)
			})
	})

	return app
}







