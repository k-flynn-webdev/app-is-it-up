const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');



function get(job,next){
	shared.find(job, function(error, found){

		if(error){
			return next(error);
		}

		if(found.length === 0){
			return next(new Error('Job does not exist.'));
		}

		return next(null,found);
	});
}
exports.get = get;






