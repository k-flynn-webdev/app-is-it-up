// // iterates over array of provided jobs ..
// let jobs = require('./global.jobs.array.js').jobs;

// const job_exec = require('./job/job.exec.js');
// const ping_create = require('./ping/ping.create.js');
// const logger = require('../helpers/logger.js');


// let app_temp = null;
// let has_init = false;


// function init(app){
// 	if(!has_init){
// 		app_temp = app;
// 		app.on('jobs.exec', exec);
// 		has_init = true;
// 	}
// }
// exports.init = init;



// function exec(time){
// 	exec_pre(time,exec_post);
// }


// function exec_pre(time, onFinish){
// 	// do jobs

// 	let i = -1;
// 	loop_result = true;
// 	console.log('loop start');

// 	// aborts current job / ping with error
// 	function loop_error(error){	
// 		logger.log(error);
// 		loop_result = false;
// 		loop_next();
// 	}
// 	function loop_next(){	
// 		i++;

// 		if(i < jobs.length){
// 			loop_all(jobs[i]);
// 		} else {
// 			console.log('loop finished');
// 			return onFinish(loop_result);
// 		}
// 	}


// 	function loop_all(job){

// 		console.log('tick');

// 		if(!job_exec.ready(job)) return loop_next();

// 		// todo time check on job? if so fire ..
// 		job_exec.exec(job, function(job_result){

// 			job_completed(job);

// 			console.log('Job exec');
// 			console.log(job_result);

// 			if(job_result.status !== 200){

// 				// create ping report ..
// 				ping_create(job,job_result,function(error,m_ping_result){

// 					if(error){
// 						loop_error(error);
// 					}

// 					job.pings.push(m_ping_result);

// 					job_save(job);
// 				});
// 			} else {
// 				job_save(job);
// 			}

// 		});
// 	};

// 	loop_next();

// }
// exports.exec_all = exec_all;



// function exec_post(input){
// 	// todo
// 	// todo save to db etc ..
// 	// build widgets etc etc ..
// }
// exports.exec_post = exec_post;



