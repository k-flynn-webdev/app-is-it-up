// const ping_get = require('../../services/ping/ping.get.js');


// module.exports = function(job,next){

// 	// search db space ..
// 	ping_get(job.job_id, function(error,result){

// 		if(error){
// 			return next(error);
// 		}

// 		// todo uptime calculation
// 		// todo clean up array so only 30 days are shown ..

// 		let obj = {
// 			uptime : 'uptime %%',
// 			data : result,
// 		}

// 		return next(null, obj);

// 	});
// };



// const sanitizer = require('sanitizer').sanitize;
// const job_model = require('../../models/job.js');
// const ping_model = require('../../models/ping.js');


// module.exports = function(job_id, next){
// 	ping_model.find({job_id : sanitizer(job_id)}, function(error, result){
		
// 		// todo all results needs to be sorted ..

// 		if(error){
// 			return next(error);
// 		}

// 		if(result.length === 0){
// 			return next(new Error('No pings with that ID exist.'));
// 		}

// 		return next(null, result);

// 	});
// }



