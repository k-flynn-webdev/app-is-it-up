// const job_model = require('../../models/job.js');
// const job_get = require('../../services/job/job.get.js');
// const global_jobs = require('../../services/global.jobs.js');


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





