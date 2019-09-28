const sanitizer = require('sanitizer').sanitize;
const job_model = require('../../models/job.js');


module.exports = function(job_id, next){
	console.log('removing: ' + job_id);
	job_model.deleteMany({job_id : sanitizer(job_id)}, function(error, result){
		
		if(error){
			return next(error);
		}

		if(result.n === 0){
			return next(new Error('No jobs with that ID exist.'));
		}

		return next(null, result);

	});
}
