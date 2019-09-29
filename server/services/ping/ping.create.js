const sanitizer = require('sanitizer').sanitize;
const m_ping = require('../../models/ping.js');

const valid = require('../../api/middlewares/job.js').valid;


module.exports = function(job, ping, next){
	
	if(!valid.check(job)) return next(new Error('Missing job.'));
	if(!valid.check(ping)) return next(new Error('Missing ping.'));

	// create db entry ..
	let new_ping_model = new m_ping({
		url : valid.url(sanitizer(job.url)),
		method : valid.method(sanitizer(job.method)),
		props : valid.props(sanitizer(job.props)),
		owner : valid.owner(sanitizer(job.owner)),
		time : valid.time(sanitizer(job.time)),
		job_id : valid.hash(job),
	});

	// ping_model.find({job_id : sanitizer(job_id)}, function(error, result){
		
	// 	// todo all results needs to be sorted ..

	// 	if(error){
	// 		return next(error);
	// 	}

	// 	if(result.length === 0){
	// 		return next(new Error('No pings with that ID exist.'));
	// 	}

	// 	return next(null, result);

	// });
}
