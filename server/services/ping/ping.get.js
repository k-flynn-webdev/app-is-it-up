const sanitizer = require('sanitizer').sanitize;
const job_model = require('../../models/job.js');
const ping_model = require('../../models/ping.js');


module.exports = function(job_id, next){
	ping_model.find({job_id : sanitizer(job_id)}, function(error, result){
		
		// todo all results needs to be sorted ..

		if(error){
			return next(error);
		}

		if(result.length === 0){
			return next(new Error('No pings with that ID exist.'));
		}

		return next(null, result);

	});
}
