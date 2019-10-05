// loads all jobs on server init / restart 
const m_job = require('../models/job.js');
const logger = require('../helpers/logger.js');
const array = require('../services/jobs/jobs.array.js');
const jobs = require('../api/logic/job/api.job.shared.js');


module.exports = function( app ){
	app.on('db-on', load_jobs);
	return app;
};


let delay_load_jobs = 5;

function load_jobs(){
	setTimeout(function(){
		jobs.find({},function(error,jobs){

			if(error){
				return logger.log(error);
			}

			if(jobs.length === 0){
				return logger.log('No jobs to load on init.');
			}

			let jobs_loaded = 0;
			for(let i = 0;i<jobs.length;i++){
				if(array.insert(jobs[i])){
					jobs_loaded +=1;
				}
			}

			logger.log(`${jobs_loaded} Jobs loaded on server init/reload.`);

		},true);
	},delay_load_jobs * 1000);
}


