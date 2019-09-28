const sanitizer = require('sanitizer').sanitize;
const job_model = require('../../models/job.js');


module.exports = function(job_id, next){
	job_model.find({job_id : sanitizer(job_id)}, function(error, result){
		
		if(error){
			return next(error);
		}

		if(result.length === 0){
			return next(new Error('No jobs with that ID exist.'));
		}

		return next(null, result);

	});
}
