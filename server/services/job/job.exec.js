// does the work of a job
const request = require('request');
const valid = require('../../api/middlewares/job.js').valid;



function exec(job, next){

	if(!valid.check(job)) return next(false);
	if(!valid.check(job.url)) return next(false);
	if(!valid.check(job.owner)) return next(false);
	if(!valid.check(job.time)) return next(false);
	if(!valid.check(job.job_id)) return next(false);

	// todo add props to the call ..

	request({ url : job.url, method : job.method, json : true }, function(error,result){

		let exec_result = { status : -1, value : false };

		if(error){
		} else {
			exec_result.status = result.statusCode;
			exec_result.value = true;			
		}

		return next(exec_result.value);

		// todo should be saving out direct to array & db instead of returning?
	});
}
module.exports = exec;