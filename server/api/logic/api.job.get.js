const job_model = require('../../models/job.js');
const job_get = require('../../services/job/job.get.js');
const global_jobs = require('../../services/global.jobs.js');


module.exports = function(job,next){

	// search global space ..
	let search = global_jobs.find(job.job_id);

	// search db space ..
	job_get(job.job_id, function(error,result){

		if(error){
			return next(error);
		}

		if(search === -1){
			search = 'Job currently not active.';
		}

		let obj = {
			index : search,
			model : result,
		}

		return next(null, obj);

	});
};







