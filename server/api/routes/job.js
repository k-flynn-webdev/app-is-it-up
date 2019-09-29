const job = require('../middlewares/job.js');
const api_job_all = require('../logic/api.job.all.js');
const api_job_get = require('../logic/api.job.get.js');
const api_ping_get = require('../logic/api.ping.get.js');
const api_job_create = require('../logic/api.job.create.js');
const api_job_update = require('../logic/api.job.update.js');
const api_job_remove = require('../logic/api.job.remove.js');


function exit(res,status,message,data){
	res.status(status).json({
		status : status,
		message : message,
		data : data,
	});
}

// todo make sure owner is valid & exists ...


module.exports = function( app ){

	app.get('/api/job/all', job.owner, function (req, res) {

		api_job_all(req.body.job, function(error, job){

			if(error){
				return exit(res,422,error.message,error);
			}
				
			return exit(res,200,'Success jobs found.',{ result : job });
		});
	});

	app.get('/api/job/:job', job.get, function (req, res) {

		api_job_get(req.body.job, function(error, job){

			if(error){
				return exit(res,422,error.message,error);
			}
				
			return exit(res,200,'Success job found.',{ result : job });
		});
	});

	app.post('/api/job/create', job.create, function (req, res) {

		api_job_create(req.body.job, function(error, new_model){

			if(error){
				return exit(res,422,error.message,error);
			}

			return exit(res,201,'Success new job created.',{ result : new_model });

		});
	});

	app.put('/api/job/:job', job.get, job.update, function (req, res) {

		api_job_update(req.body.job, function(error, new_model){

			if(error){
				return exit(res,422,error.message,error);
			}

			return exit(res,201,'Success job updated.',{ result : new_model });

		});
	});

	app.delete('/api/job/:job', job.get, function (req, res) {

		api_job_remove(req.body.job, function(error, job){

			if(error){
				return exit(res,422,error.message,error);
			}
				
			return exit(res,200,'Success job removed.',{ result : job });
		});
	});

	return app;

};







