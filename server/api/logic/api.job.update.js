const job_update = require('../../services/job/job.update.js');
const global_jobs = require('../../services/global.jobs.js');
// const m_job = require('../../models/job.js');


module.exports = function(job,next){

	job_update(job, function(error, m_job){

		if(error){
			return next(error);
		}

		let result = global_jobs.update(m_job);

		if( process.env.NODE_ENV === 'test' ){
			return next(null, m_jobs);
		}

		m_job.save(function(error, result){

			if(error){
				return next(error);
			}

			// todo add to user via event?

			return next(null, m_job);
		});
	});
};







