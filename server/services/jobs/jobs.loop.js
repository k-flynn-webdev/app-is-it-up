// // iterates over array of provided jobs ..
let array = require('./jobs.array.js');
const jobs_exec = require('./jobs.exec.js');
const m_ping = require('../../models/ping.js');
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
	let jobs = array.get_jobs();
	let job_ready = jobs_exec.ready;
	let job_exec = jobs_exec.exec;
	let job_complete = jobs_exec.complete;

	loop_exec(jobs,job_ready,job_exec,job_complete);
}
exports.exec = exec;




function add_ping(job,result){
	let tmp_ping = new m_ping({
		url : result.url,
		status : result.status,
		job_id : job.job_id,
		owner : job.owner,
	});

	job.pings.push(tmp_ping);

	if(process.env.NODE_ENV === 'test') return;

	tmp_ping.save(function(error,result){
		if(error){
			logger.log(error);
		}
	});
}
exports.add_ping = add_ping;



function loop_exec(jobs,job_ready,job_exec,job_complete){

	let i = 0;
	let result = [];

	function go_next(){
		i++;
		if(i < jobs.length){
			return loop(time_now,jobs[i]);
		} 
	}

	if(jobs.length < 1) return result;

	let time_now = Date.now();

	loop(time_now,jobs[i]);


	function loop(time_now,job){

		if(!job_ready(time_now,job)){
			return go_next();
		}

		job_exec(job, function(error,job_result){

			let tmp = true;

			if(error){
				tmp = false;
				add_ping(job,job_result)
			} 

			result.push(tmp);

			job_complete(job);

			// update job
			if(process.env.NODE_ENV === 'test') return go_next();

			job.save(function(error,job_save){

				if(error){
					logger.log(error);
				}

				go_next();
			});
		});
	}

	// todo unclear if it exits properly??

	return result;
}
exports.loop_exec = loop_exec;



