// global array of jobs for speed
const job_exec = require('./job/job.exec.js');
const ping_create = require('./ping/ping.create.js');
const m_job = require('../models/job.js');
const logger = require('../helpers/logger.js');


let jobs = null;
let has_init = false;
// creating singleton of jobs ..
(function(){
	if( jobs === null || jobs === undefined){ jobs = []; }
})();




function init(app){
	if(!has_init){
		app.on('jobs.exec', exec);
		has_init = true;
	}
}
exports.init = init;



function exec(input){
	exec_all(input,exec_after);
}

function exec_after(output){
	// todo
	// todo save to db etc ..
	// build widgets etc etc ..
}



function exec_all(time, onFinish){
	// do jobs

	let i = -1;
	loop_result = true;

	// aborts current job / ping with error
	function loop_error(error){	
		logger.log(error);
		loop_result = false;
		i++;
		loop_all(jobs[i]);
	}
	function loop_complete(){	
		i++;

		if(i < jobs.length){
			loop_all(jobs[i]);
		} else {
			return onFinish(loop_result);
		}
	}


	function loop_all(job){

		// todo time check on job? if so fire ..

		job_exec(job, function(error,job_result){

			if(error){
				loop_error(error);
			}

			ping_create(job,job_result,function(error,m_ping_result){

				if(error){
					loop_error(error);
				}

				// add to stack 
				job.pings.push(m_ping_result);

				// todo more than 30 days, cleanup?

				// save job db
				job.save(function(error,result){

					if(error){
						return loop_error(error);
					}

					loop_complete();
				});

			});
		});
	};

	loop_complete();

}
exports.exec_all = exec_all;



function find(job_id){
	for(let i = 0; i < jobs.length;i++){
		if(jobs[i].job_id === job_id) return i;
	}

	return -1;
}
exports.find = find;

function find_owner(owner){
	let jobs = [];
	for(let i = 0; i < jobs.length;i++){
		if(jobs[i].owner === owner) jobs.push(i);
	}
	return jobs;
}
exports.find_owner = find_owner;


function insert(job){
	let search = find(job.job_id);
	if(search !== -1){
		logger.log('Error, inserting a duplicate job to stack(jobs).');
		return false;
	}

	jobs.push(job);
	return true;
}
exports.insert = insert;

function update(job){
	let updated = false;
	let search = find(job.job_id);
	if(search !== -1){
		jobs.splice(search,1,job);
		updated = true;
	} else {
		// todo user might not want to push a job just yet if it wasn''t already?
		// jobs.push(job);
	}

	return updated;
}
exports.update = update;

function remove(job){

	let removed = false;
	let search = find(job.job_id);
	if(search !== -1){
		jobs.splice(search,1);
		removed = true;
	}

	return removed;
}
exports.remove = remove;




