const job = require('../middlewares/job.js');
const api_job_create = require('../logic/api.job.create.js');


module.exports = function( app ){

	// app.get('/api/job/:job', function (req,res) {

	// 	request.params.job;
		
	// 	// create job
	// 	// save job
	// });


	app.post('/api/job', job.middle, function (req, res) {

		function exit(status,message,data){
			res.status(status).json({
				status : status,
				message : message,
				data : data,
			});
		}

		// todo make sure owner is valid & exists ...

		api_job_create(req.body.job, function(error, new_model){

			if(error){
				return exit(422,error.message,error);
			}

			// saving here due to jest not playing well with mongo
			new_model.save( function(error, result){

				if(error){
					return exit(500,error.message,error);
				}
				
				return exit(201,'Success new job created.',{ result : result });

			});
		});
	});




	return app;

};







