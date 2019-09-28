const job_model = require('../../models/job.js');
const job_all = require('../../services/job/job.all.js');
const global_jobs = require('../../services/global.jobs.js');


module.exports = function(job,next){

	// search global space ..
	let search = global_jobs.find_owner(job.owner);

	// search db space ..
	job_all(job.owner, function(error,result){

		if(error){
			return next(error);
		}

		if(search === -1){
			search = 'Jobs currently not active.';
		}

		let obj = {
			indexs : search,
			models : result,
		}

		return next(null, obj);

	});
};







