// global array of jobs for speed
let jobs = null;

let has_init = false;
// creating singleton of jobs ..
(function(){
	if( jobs === null || jobs === undefined){ jobs = []; }
})();


function get_jobs(){
	return jobs;
}
exports.get_jobs = get_jobs;


function init(app){
	if(!has_init){
		has_init = true;
	}
}
exports.init = init;



function find_job(job_id){
	for(let i = 0; i < jobs.length;i++){
		if(jobs[i].job_id === job_id) return i;
	}

	return -1;
}
exports.find_job = find_job;

function find_owner(owner){
	let tmp = [];
	for(let i = 0; i < jobs.length;i++){
		if(jobs[i].owner === owner) tmp.push(i);
	}
	return tmp;
}
exports.find_owner = find_owner;


// todo on job insertion check server time, if new job is < update server timing ..

function insert(job){
	let search = find_job(job.job_id);
	let inserted = false;
	if(search === -1 && job.active){
		jobs.push(job);
		inserted = true;
	}

	return inserted;
}
exports.insert = insert;

function update(job){
	let updated = false;
	let search = find_job(job.job_id);
	if(search !== -1){
		jobs.splice(search,1,job);
		updated = true;
	}

	return updated;
}
exports.update = update;

function remove(job){
	let removed = false;
	let search = find_job(job.job_id);
	if(search !== -1){
		jobs.splice(search,1);
		removed = true;
	}

	return removed;
}
exports.remove = remove;




