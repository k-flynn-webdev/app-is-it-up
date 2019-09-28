const m_job = require('../../models/job.js');
const sanitizer = require('sanitizer').sanitize;
const valid = require('../../api/middlewares/job.js').valid;


// todo check validness of all props ..

module.exports = function(job, next){

	if(!valid.check(job)) return next(new Error('Missing information.'));
	if(!valid.check(job.url)) return next(new Error('Missing url.'));
	if(!valid.check(job.owner)) return next(new Error('Missing owner.'));
	if(!valid.check(job.time)) return next(new Error('Missing time.'));

	if(!valid.url(job.url)) return next(new Error('Invalid url.'));
	if(!valid.owner(job.owner)) return next(new Error('Invalid owner.'));
	if(!valid.time(job.time)) return next(new Error('Invalid time.'));


	// create db entry ..
	let new_job_model = new m_job({
		url : valid.url(sanitizer(job.url)),
		method : valid.method(sanitizer(job.method)),
		props : valid.props(sanitizer(job.props)),
		owner : valid.owner(sanitizer(job.owner)),
		time : valid.time(sanitizer(job.time)),
		job_id : valid.hash(job),
	});

	return next(null, new_job_model);
}



