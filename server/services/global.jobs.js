// global array of jobs for speed
const job_exec = require('./job/job.exec.js');


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
	// console.log('inside exec: ' + input );	
	exec_all(input,exec_after);
}

function exec_after(output){
	// todo save to db etc ..
	// build widgets etc etc ..
}



function exec_all(time, onFinish){
	// do jobs
	let results = [];

	let i = 0;

	function loop_all(job){
		job_exec(job, function(result){

			results.push(result);
			i++;

			if(i < jobs.length){
				loop_all(jobs[i]);
			} else {
				return onFinish(results);
			}
		});
	};

	if( jobs.length > 0){
		loop_all(jobs[0]);
	} else {
		return onFinish(results);
	}

}
exports.exec_all = exec_all;




function find(job_id){
	for(let i = 0; i < jobs.length;i++){
		if(jobs[i].job_id === job_id){
			return i;
		}
	}
	return -1;
}
exports.find = find;


function insert(job){
	let search = find(job.job_id);
	if(search !== -1){
		console.log('Error, inserting a duplicate job to stack(jobs).');
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








// // insert fake job to test
// setTimeout( function(){
// 	fakeJob();
// }, 6000);

// function fakeJob(){
// 	let tempJob = {
// 		url : 'https://www.google.com/',
// 		method : 'GET',
// 		props : '',
// 		owner : 'owner',
// 		time : '1313',
// 		id :'13123',
// 	}
// 	console.log('fake job inserted.');
// 	insert(tempJob);
// }
///////////////////



