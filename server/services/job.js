const m_job = require('../models/job.js')
// const exit = require('../services/exit.js')
const logger = require('../helpers/logger.js')
const has = require('../helpers/has.js')


function create ({ job, auth }) {

	let newJob = new m_job()

	if (auth) {
		newJob.user.name = auth.name
		newJob.user.id = auth.id
	}
	if (has.item(job.name)) {
		newJob.name = job.name
	}
	if (has.item(job.url)) {
		newJob.setUrl(job.url)
	}
	if (has.item(job.method)) {
		newJob.setMethod(job.method)
	}
	if (has.item(job.ping)) {
		newJob.setPing(job.ping)
	}

	newJob.setJobHash()

	return m_job.findOne({job_hash: newJob.job_hash})
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
