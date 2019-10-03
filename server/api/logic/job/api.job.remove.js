const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');



function remove(job,next){

	shared.remove(job, function(error,result){

		if(error){
			return next(error);
		}

		if(result.deletedCount === 0){
			return next(new Error('Job does not exist.'));
		}

		let global_removed = jobs_array.remove(result);

		// remove from user via event 

		return next(null,result);
	});
}
exports.remove = remove;


// todo remove from global space also ...



