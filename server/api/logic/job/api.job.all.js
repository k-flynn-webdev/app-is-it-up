// const job_model = require('../../models/job.js');
// const job_all = require('../../services/job/job.all.js');
// const global_jobs = require('../../services/global.jobs.js');


// module.exports = function(job,next){

// 	// search global space ..
// 	let search = global_jobs.find_owner(job.owner);

// 	// search db space ..
// 	job_all(job.owner, function(error,result){

// 		if(error){
// 			return next(error);
// 		}

// 		if(search === -1){
// 			search = 'Jobs currently not active.';
// 		}

// 		let obj = {
// 			indexs : search,
// 			models : result,
// 		}

// 		return next(null, obj);

// 	});
// };







// const sanitizer = require('sanitizer').sanitize;
// const job_model = require('../../models/job.js');


// module.exports = function(owner, next){
// 	job_model.find({owner : sanitizer(owner)}, function(error, result){
		
// 		if(error){
// 			return next(error);
// 		}

// 		if(result.length === 0){
// 			return next(new Error('No jobs with that owner exist.'));
// 		}

// 		return next(null, result);

// 	});
// }
