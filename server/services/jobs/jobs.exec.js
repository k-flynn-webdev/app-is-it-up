// // does the work of a job
const request = require('request');
const m_job = require('../../models/job.js');
const logger = require('../../helpers/logger.js');


// time func
function complete(job){
	job.meta.num +=1;
	if(job.meta.num > job.meta.max){
		job.meta.num = 0;
	}
	// set new time for request ..
	job.meta.next = Date.now() + (1000 * job.time);
}
exports.complete = complete;


function ready(time_now,job){
	// time_now = new Date(); should be calculated at bgeining of  
	// loop and fed in for perf reasons ..
	if(time_now >= new Date(job.meta.next)) return true;
	return false;
}
exports.ready = ready;


function save(model,next){

	if( process.env.NODE_ENV === 'test' ){
		return next(null, model);
	}

	model.save(function(error,result){
		if(error){
			logger.log(error);
			return next(error);
		}
		return next(null,result);
	});
}
exports.save = save;


function exec(job, next){
	// todo add props to the call ..
	request({ url : job.url, method : job.method, json : true }, function(error,result){

		let exec_result = { url: job.url, status: -1 };

		if(error){
			return next(exec_result);
		}

		exec_result.status = result.statusCode;

		return next(null,exec_result);

		// todo should be saving out direct to array & db instead of returning?
	});
}
exports.exec = exec;


