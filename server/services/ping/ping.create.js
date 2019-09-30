const sanitizer = require('sanitizer').sanitize;
const m_ping = require('../../models/ping.js');
const valid = require('../../api/middlewares/job.js').valid;


module.exports = function(job, ping, next){
	
	if(!valid.check(job)) return next(new Error('Missing job.'));
	if(!valid.check(ping)) return next(new Error('Missing ping.'));

	// create db entry ..
	let new_ping_model = new m_ping({
		url : sanitizer(job.url),
		job_id : sanitizer(job.job_id),
		status : sanitizer(ping.status),
		time : Date.now(),
		owner : sanitizer(job.owner),
	});

	new_ping_model.save();

	return next(null, new_ping_model);
}
