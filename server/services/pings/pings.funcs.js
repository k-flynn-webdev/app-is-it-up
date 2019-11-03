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

	let tmp_ping = new m_ping({
		url : job.url,
		status : result.status,
		job_id : job.job_id,
		user : job.user,
		date : Date.now(),
	});

	if(process.env.NODE_ENV === 'test') return;

	tmp_ping.save(function(error,result){
		if(error){
			logger.log(error);
		}
	});

	return tmp_ping;
}
exports.create = create;


function remove(job){

	if(process.env.NODE_ENV === 'test') return;

	m_ping.deleteMany({job_id : job.job_id },function(error,result){

		if(error){
			return logger.log(error);
		}

		logger.log(JSON.stringify(result));
	});
}
exports.remove = remove;



