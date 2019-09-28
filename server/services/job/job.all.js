const sanitizer = require('sanitizer').sanitize;
const job_model = require('../../models/job.js');


module.exports = function(owner, next){
	job_model.find({owner : sanitizer(owner)}, function(error, result){
		
		if(error){
			return next(error);
		}

		if(result.length === 0){
			return next(new Error('No jobs with that owner exist.'));
		}

		return next(null, result);

	});
}
