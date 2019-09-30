// // does the work of a job
// const request = require('request');
// const valid = require('../../api/middlewares/job.js').valid;


// // time func
// function job_completed(job){
// 	job.meta.num +=1;
// 	if(job.meta.num > job.meta.max){
// 		job.meta.num = 0;
// 	}
// 	// set new time for request ..
// 	job.meta.next = Date.now() + job.time;
// }
// exports._job_complete = job_completed;

// // todo test this
// function job_time_check(time_now,job){
// 	let test = false;
// 	let time_next = new Date(job.meta.next).getTime();
// 	if( time_now >= time_next){
// 		test = true;
// 	}
// 	console.log(time_now,time_next,time_now-time_next);
// 	return test;
// }
// exports._job_time = job_time_check;
// // on finish update for next loop ..
// 	function job_save(job){
// 		// save job db
// 		job.save(function(error,result){
// 			if(error){
// 				return loop_error(error);
// 			}
// 			loop_complete();
// 		});		
// 	}
// }


// function ready(job){
// 	// todo time check here ...
// 	return true;
// }
// exports.ready = ready;


// function exec(job, next){

// 	if(!valid.check(job)) return next(false);
// 	if(!valid.check(job.url)) return next(false);
// 	if(!valid.check(job.owner)) return next(false);
// 	if(!valid.check(job.time)) return next(false);
// 	if(!valid.check(job.job_id)) return next(false);

// 	// todo add props to the call ..

// 	request({ url : job.url, method : job.method, json : true }, function(error,result){

// 		let exec_result = { url: job.url, status: -999, value: false };

// 		if(result){
// 			exec_result.status = result.statusCode;
// 			exec_result.value = true;	
// 		}

// 		return next(exec_result);

// 		// todo should be saving out direct to array & db instead of returning?
// 	});
// }
// exports.exec = exec;


