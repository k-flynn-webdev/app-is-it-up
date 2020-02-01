const m_ping = require('../../models/ping.js');
const logger = require('../../helpers/logger.js');

let app_temp = null;
let has_init = false;


function init(app){
	if(!has_init){
		app_temp = app;
		// app.on('jobs.exec', exec);
		has_init = true;
	}
}
exports.init = init;


function create(job,result){

	let userId = job.user.id || null

	let tmp_ping = new m_ping({
		url : job.url,
		status : result.status,
		job_id : job.job_id,
		user : userId,
		date : Date.now(),
	});

	if(process.env.NODE_ENV === 'test') return tmp_ping

	tmp_ping.save()
		.catch(err => {
			logger.log(err);
		})

	return tmp_ping;
}
exports.create = create;


function remove(job, next){

	if(process.env.NODE_ENV === 'test') return;

	m_ping.deleteMany({job_id : job.job_id })
		.then(result => {
			logger.log(JSON.stringify(result));
			return next(null,result)
		})
		.catch(err => {
			logger.log(err);
			return next(err)
		})
}
exports.remove = remove;



