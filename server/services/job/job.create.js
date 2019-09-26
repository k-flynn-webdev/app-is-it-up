// creates a db job to be sent to the reader
const sanitizer = require('sanitizer');


function check_exists(input){
	if(input === null) return false;
	if(input === undefined) return false;
	if( input.toString().length < 1){
		return false;
	}
	return true;
}

function create_hash(job) {
	let temp = job.url + job.method + job.props + job.time + job.owner;

	var hash = 0, i, chr;
	if (temp.length === 0) return hash;
	for (i = 0; i < temp.length; i++) {
		chr = temp.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

// todo check validness of all props ..

function create(job){

	if(!check_exists(job)) return false;
	if(!check_exists(job.url)) return false;
	if(!check_exists(job.owner)) return false;
	if(!check_exists(job.time)) return false;

	let tempJob = {
		url : sanitizer.sanitize(job.url),
		method : sanitizer.sanitize(job.method) || 'GET',
		props : sanitizer.sanitize(job.props) || '',
		owner : sanitizer.sanitize(job.owner),
		time : sanitizer.sanitize(job.time),
		job_id : create_hash(job),
		_id: '',
	}

	return tempJob;
}
module.exports = create;







