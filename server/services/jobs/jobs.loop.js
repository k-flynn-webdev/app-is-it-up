// // iterates over array of provided jobs ..
let array = require('./jobs.array.js');

const jobs_exec = require('./jobs.exec.js');
// const ping_create = require('./ping/ping.create.js');
const logger = require('../../helpers/logger.js');


let app_temp = null;
let has_init = false;


function init(app){
	if(!has_init){
		app_temp = app;
		app.on('jobs.exec', exec);
		has_init = true;
	}
}
exports.init = init;



function exec(time){
	// let jobs = array.get_jobs();
	// let do_job = function(){
	// 	console.log(this.i);
	// }	
	// let end = function(){
	// 	console.log('ended');
	// }

	// let vars = {
	// 	i : 0, 
	// 	work : jobs, 
	// 	exec : do_job, 
	// 	end : end };

	// loop.bind(vars)();

	// exec_pre(jobs,time,exec_post);
}
exports.exec = exec;


exec();

// function loop_start(jobs,error,next,finish){
// 	let i = 0;
// 	let work = [];
// 	// let 




// }
// exports.loop_start = loop_start;


function loop_exec(){

	let obj = { i : 0, work : array.get_jobs() };
	let go_next_t = go_next.bind(obj);
	let go_end_t = go_end.bind(obj);

	function loop(item){

		if(!jobs_exec.ready(item)){
			go_next_t();
			return loop(obj.work[obj.i]);
		}

		jobs_exec.exec(item, function(error,result){
			
			

		});
	}





}








	// function loop(jobs){
	// 	if(!jobs_exec.ready(input.work[i])){
	// 		return 
	// 	} 
	// 	exec(input,function(error,result){
	// 		if(error){
	// 			log_error(error);
	// 		}
	// 		if(!has_finished_t()){
	// 			loop(jobs);
	// 		}
	// 	});

	// 	return result;
	// }




function log_error(error){	
	logger.log(error);
}


function go_next(){
	this.i++;
}
exports.go_next = go_next;


function go_end(){
	if(this.i < this.work.length){
		return false;
	} else {
		return true;
	}
}
exports.go_end = go_end;


// function go_end(){
// 	if(this.i >= this.work.length){
// 		return this.end();
// 	}
// }
// exports.go_end = go_end;


// function exec_pre(time, onFinish){
// 	// do jobs

// 	let i = -1;
// 	loop_result = true;
// 	console.log('loop start');

	// aborts current job / ping with error



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
// exports.exec_pre = exec_pre;



// function exec_post(input){
// 	// todo
// 	// todo save to db etc ..
// 	// build widgets etc etc ..
// }
// exports.exec_post = exec_post;



