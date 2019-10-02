const m_job = require('../../../models/job.js');
const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');

// const job_model = require('../../models/job.js');
// const job_get = require('../../services/job/job.get.js');
// const global_jobs = require('../../services/global.jobs.js');

function get(input, next){

	create_model(input, function(error, job_model){

		if(error){
			return next(error);
		}

		// does it exist?
		m_job.find({ job_id : job_model.job_id }, function(error, found){

			if(error){
				return next(error);
			}

			if(found.length !== 0){
				return next(new Error('Already exists.'));
			}

			job_model.save(function(error,result){

				if(error){
					return next(error);
				}

				let success = jobs_array.insert(job_model);
				if(!success){
					return next(new Error('A problem occurred on the Job Stack.'));
				}

				// todo add to user via event?

				return next(null,job_model);
			});
		});
	});
}
exports.get = get;

// module.exports = function(job,next){

// 	// search global space ..
// 	let search = global_jobs.find(job.job_id);

// 	// search db space ..
// 	job_get(job.job_id, function(error,result){

// 		if(error){
// 			return next(error);
// 		}

// 		if(search === -1){
// 			search = 'Job currently not active.';
// 		}

// 		let obj = {
// 			index : search,
// 			model : result,
// 		}

// 		return next(null, obj);

// 	});
// };


// const sanitizer = require('sanitizer').sanitize;
// const job_model = require('../../models/job.js');


// module.exports = function(job_id, next){
// 	job_model.find({job_id : sanitizer(job_id)}, function(error, result){
		
// 		if(error){
// 			return next(error);
// 		}

// 		if(result.length === 0){
// 			return next(new Error('No jobs with that ID exist.'));
// 		}

// 		return next(null, result);

// 	});
// }





