const job_model = require('../../models/job.js');
const job_create = require('../../services/job/job.create.js');
const global_jobs = require('../../services/global.jobs.js');


module.exports = function(job,next){

	let new_job = job_create(job);

	if(!new_job){
		return next(new Error('Missing information.'));
	}

	// search global space ..
	let search = global_jobs.find(new_job.job_id);

	if(search !== -1){
		return next(new Error('Already exists.'));
	}

	let result = global_jobs.insert(new_job);
	
	if(!result){
		return next(new Error('A problem occurred on the Job Stack.'));
	}

	// create db entry ..
	let new_job_model = new job_model({
		url : new_job.url,
		method : new_job.method,
		props : new_job.props,
		owner : new_job.owner,
		time : new_job.time,
		job_id : new_job.job_id,
	});

	return next(null, new_job_model);
};







