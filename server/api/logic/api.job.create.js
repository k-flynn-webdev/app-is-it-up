const job_create = require('../../services/job/job.create.js');
const global_jobs = require('../../services/global.jobs.js');


module.exports = function(job,next){

	job_create(job, function(error, m_job){

		if(error){
			return next(error);
		}

		// search global space ..
		let search = global_jobs.find(m_job.job_id);
		if(search !== -1){
			return next(new Error('Already exists.'));
		}

		// todo future / search db for duplicate? 

		let result = global_jobs.insert(m_job);
		if(!result){
			return next(new Error('A problem occurred on the Job Stack.'));
		}


		if( process.env.NODE_ENV === 'test' ){
			return next(null, m_job);
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







