// const job_update = require('../../services/job/job.update.js');
// const global_jobs = require('../../services/global.jobs.js');
// // const m_job = require('../../models/job.js');


// module.exports = function(job,next){

// 	job_update(job, function(error, m_job){

// 		if(error){
// 			return next(error);
// 		}

// 		let result = global_jobs.update(m_job);

// 		if( process.env.NODE_ENV === 'test' ){
// 			return next(null, m_jobs);
// 		}

// 		m_job.save(function(error, result){

// 			if(error){
// 				return next(error);
// 			}

// 			// todo add to user via event?

// 			return next(null, m_job);
// 		});
// 	});
// };





// const m_job = require('../../models/job.js');
// const sanitizer = require('sanitizer').sanitize;
// const valid = require('../../api/middlewares/job.js').valid;


// // todo check validness of all props ..


// module.exports = function(job, next){

// 	if(!valid.check(job)) return next(new Error('Missing information.'));
// 	if(!valid.check(job.url)) return next(new Error('Missing url.'));
// 	if(!valid.check(job.owner)) return next(new Error('Missing owner.'));
// 	if(!valid.check(job.time)) return next(new Error('Missing time.'));
// 	if(!valid.check(job.job_id)) return next(new Error('Missing id.'));


// 	if( process.env.NODE_ENV === 'test' ){
// 		let job_db = Object.assign(new m_job(), job);
// 		return update(job_db,job,next);
// 	}


// 	m_job.find({job_id : sanitizer(job.job_id)}, function(error, m_job_result){

// 		if(error){
// 			return next(error);
// 		}

// 		if(m_job_result.length === 0){
// 			return next(new Error('No jobs with that ID exist.'));
// 		}

// 		return update(m_job_result[0],job,next);
// 	});
// }

// // todo move this to shared api func to be used ..

// function update(job_db,job_new,next){

// 	if(!valid.url(job_new.url)) return next(new Error('Invalid url.'));
// 	if(!valid.owner(job_new.owner)) return next(new Error('Invalid owner.'));
// 	if(!valid.time(job_new.time)) return next(new Error('Invalid time.'));

// 	// update db entry ..
// 	job_db.url = valid.url(sanitizer(job_new.url));
// 	job_db.method = valid.method(sanitizer(job_new.method));
// 	job_db.props = valid.props(sanitizer(job_new.props));
// 	job_db.owner = valid.owner(sanitizer(job_new.owner));
// 	job_db.time = valid.time(sanitizer(job_new.time));
// 	job_db.meta = valid.meta(sanitizer(job_new));

// 	return next(null, job_db);
// }









