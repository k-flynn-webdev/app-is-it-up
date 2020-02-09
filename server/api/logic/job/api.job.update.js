// const jobs_array = require('../../../services/jobs/jobs.array.js')
// const m_job = require('../../../models/job.js')
//
// const shared = require('./api.job.shared.js')
// const logger = require('../../../helpers/logger.js')
//
// function update ({ job, auth }, next) {
//
// 	m_job.findOne({ job_id: job.job_id })
// 		.then(result => {
//
// 			if (!result) {
// 				throw new Error('No job with that id found.')
// 			}
//
// 			if (!auth) {
// 				if (result.user.id) {
// 					throw new Error('Must login to see this job.')
// 				}
//
// 			} else {
//
// 				if (auth.role !== 'admin' &&
// 					result.user.id.toString() !== auth.id.toString()) {
// 					throw new Error('Must login to see this job.')
// 				}
// 			}
//
// 			let new_model = shared.update(result, job)
// 			let hasUpdated = updateStack(new_model)
//
// 			// auto return for test
// 			// if(process.env.NODE_ENV === 'test') return next(null, new_model)
//
// 			return new_model.save()
// 		})
// 		.then(item => {
// 			return next(null, item)
// 		})
// 		.catch(err => {
// 			logger.log(err)
// 			return next(err)
// 		})
// }
//
// exports.update = update
//
// function updateStack (job) {
//
// 	job.has_updated = false
// 	let index = jobs_array.find_job(job.job_id)
//
// 	if (job.active && index === -1) {
// 		job.has_updated = jobs_array.insert(job)
// 		logger.log(`Job(stack: ${index}) added: ${job.job_id} ${job.has_updated}`)
// 	} else {
// 		job.has_updated = jobs_array.update(job)
// 		logger.log(`Job(stack: ${index}) updated: ${job.job_id} ${job.has_updated}`)
// 	}
//
// 	return job.has_updated
// }
//
