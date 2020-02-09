const m_user = require('../../models/user.js')
const m_job = require('../../models/job.js')
const exit = require('../../services/exit.js')
const logger = require('../../helpers/logger.js')
const job = require('../../services/job.js')
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

	// app.get('/api/job/all', token.passive, function (req, res) {
	//
	// 	api_job_stack.get_stack(req.body.token, function (error, jobs) {
	//
	// 		if (error) {
	// 			return exit(res, 422, error.message, error)
	// 		}
	//
	// 		let safe_jobs = jobs.map(item => api_job_shared.safe_export(item))
	//
	// 		return exit(res, 200, 'Success jobs found.', { jobs: safe_jobs })
	// 	})
	// })
	//
	app.post('/api/job/create', token.passive, jobMiddle.create, function (req, res) {

		let newJob = null

		job.create({ job: req.body, auth: req.body.token })
			.then(result => {
				newJob = result

				let userPromise = Promise.resolve()
				if (req.body.token && req.body.token.id) {
					userPromise = m_user.findOne({ _id: req.body.token.id })
						.then(user => {
							user.jobs.push(newJob.job_hash)
							return user.save()
						})
				}
				return userPromise
			})
			.then(() => {
				return exit(res, 201, 'Success new job created',
				{ job : newJob.safeExport() })
			})
			.catch(err => {
				return exit(res, 422, err.message || err, err)
			})
	})

	// app.get('/api/job/:job', token.passive, job.get, function (req, res) {
	//
	// 	api_job_get.get({ job: req.body.job, auth: req.body.token }, function (error, job) {
	//
	// 		if (error) {
	// 			return exit(res, 422, error.message || error, error)
	// 		}
	//
	// 		let safe_job = api_job_shared.safe_export(job)
	//
	// 		return exit(res,
	// 			200,
	// 			'Success job found.',
	// 			{ job: safe_job },
	// 			isVerifiedMsg(req.body.token)
	// 		)
	// 	})
	// })
	//
	// app.patch('/api/job/:job', token.passive, job.update, function (req, res) {
	//
	// 	api_job_update.update({ job: req.body.job, auth: req.body.token }, function (error, job) {
	//
	// 		if (error) {
	// 			return exit(res, 422, error.message || error, error)
	// 		}
	//
	// 		let safe_job = api_job_shared.safe_export(job)
	//
	// 		return exit(res, 201, 'Success job updated.', { job: safe_job })
	//
	// 	})
	// })
	//
	// app.delete('/api/job/:job', token.passive, job.get, function (req, res) {
	//
	// 	api_job_remove.remove({ job: req.body.job, auth: req.body.token }, function (error, job) {
	//
	// 		if (error) {
	// 			return exit(res, 422, error.message || error, error)
	// 		}
	//
	// 		let safe_job = api_job_shared.safe_export(job)
	//
  //     // todo update job on user ..
	//
  //     pings.remove(job, function (error, pings_removed) {
	//
	// 			if (error) {
	// 				return exit(res, 422, error.message || error, error)
	// 			}
	//
	// 			return exit(res,
  //         200,
  //         'Success job removed.',
  //         { job: safe_job, pings_removed: pings_removed },
	// 				isVerifiedMsg(req.body.token)
  //         )
	// 		})
	// 	})
	// })

	return app
}







