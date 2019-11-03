const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');
const logger = require('../../../helpers/logger.js');



function remove(job,next){

	shared.remove(job, function(error,result){

		if(error){
			return next(error);
		}

		if(result.result.deletedCount < 1){
			return next(new Error('Job does not exist.'));
		}

		let global_removed = jobs_array.remove(result);
		logger.log(`Job(stack:--) removed: ${job.job_id} ${global_removed}`);

		// remove from user via event 

		return next(null,result);
	});
}
exports.remove = remove;


// todo remove from global space also ...



