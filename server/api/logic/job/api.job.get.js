const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');



function get(job,next){
	shared.find(job, function(error, result){

		if(error){
			return next(error);
		}

		if(result.found.length === 0){

			if(result.user){
				return next(new Error('No jobs for that user found.'));
			}

			if(result.job_id){
				return next(new Error('Job does not exist.'));
			}

		}

		return next(null,result.found);
	});
}
exports.get = get;






