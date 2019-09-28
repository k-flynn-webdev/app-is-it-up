const job_remove = require('../../services/job/job.remove.js');
const global_jobs = require('../../services/global.jobs.js');


module.exports = function(job,next){

	job_remove(job.job_id, function(error, m_job){

		if(error){
			return next(error);
		}

		let result = global_jobs.remove(job);
		if(result){
			// todo remove from user via event
		}

		return next(null, m_job);
	});
};







