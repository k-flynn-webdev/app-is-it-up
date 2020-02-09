// const jobs_array = require('../../../services/jobs/jobs.array.js')
// const m_job = require('../../../models/job.js')
//
// const logger = require('../../../helpers/logger.js')
//
// function remove ({ job, auth }, next) {
//
// 	m_job.findOne({ job_id: job.job_id })
// 		.then(result => {
//
// 			if (!result) {
// 				throw new Error('No job with that id found.')
// 			}
//
// 			if (!auth && result.user.id) {
// 				throw new Error('Must login to remove this job.')
// 			}
//
// 			if (auth && auth.role !== 'admin' &&
// 				result.user.id.toString() !== auth.id.toString()) {
// 				throw new Error('User not allowed to delete this job.')
// 			}
//
// 			let index = jobs_array.find_job(result.job_id)
// 			result.has_updated = jobs_array.remove(result)
// 			logger.log(`Job(stack: ${index}) removed: ${result.job_id} ${result.has_updated}`)
//
// 			return m_job.deleteOne({ job_id: job.job_id })
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
// exports.remove = remove
//
