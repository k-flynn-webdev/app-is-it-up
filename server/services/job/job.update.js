// updates jobs in the global space and db ..

const sanitizer = require('sanitizer');


function check_exists(input){
	if(input === null) return false;
	if(input === undefined) return false;
	if( input.toString().length < 1){
		return false;
	}
	return true;
}

// todo check validness of all props ..

function update(job){

	if(!check_exists(job)) return false;
	if(!check_exists(job.url)) return false;
	if(!check_exists(job.owner)) return false;
	if(!check_exists(job.time)) return false;
	if(!check_exists(job.id)) return false;

	let tempJob = {
		url : sanitizer.sanitize(job.url),
		owner : sanitizer.sanitize(job.owner),
		time : sanitizer.sanitize(job.time),
		id : sanitizer.sanitize(job.id),
	}

	return tempJob;
}
module.exports = update;