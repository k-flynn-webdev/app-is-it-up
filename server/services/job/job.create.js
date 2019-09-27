// creates a db job to be sent to the reader
const sanitizer = require('sanitizer');
const valid = require('../../api/middlewares/job.js').valid;



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

	if(!valid.check(job)) return false;
	if(!valid.check(job.url)) return false;
	if(!valid.check(job.owner)) return false;
	if(!valid.check(job.time)) return false;

	if(!valid.url(job.url)) return false;
	if(!valid.owner(job.owner)) return false;
	if(!valid.time(job.time)) return false;

	let temp_job = {
		url : valid.url(sanitizer.sanitize(job.url)),
		method : valid.method(sanitizer.sanitize(job.method)),
		props : valid.props(sanitizer.sanitize(job.props)),
		owner : valid.owner(sanitizer.sanitize(job.owner)),
		time : valid.time(sanitizer.sanitize(job.time)),
		job_id : create_hash(job),
		_id: '',
	}

	return temp_job;
}
module.exports = create;







