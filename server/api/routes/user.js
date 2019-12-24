const valid_user = require('../middlewares/user.js');
const api_user_create = require('../logic/user/api.user.create.js').create;
const api_user_login = require('../logic/user/api.user.login.js').login;
const admin_auth = require('../middlewares/admin.auth.js');
// const api_ping_get = require('../logic/api.ping.get.js');
// const api_job_get = require('../logic/job/api.job.get.js');
// const api_job_create = require('../logic/job/api.job.create.js');
// const api_job_update = require('../logic/job/api.job.update.js');
// const api_job_remove = require('../logic/job/api.job.remove.js');


function exit(res,status,message,data){
	res.status(status).json({
		status : status,
		message : message,
		data : data,
	});
}

// todo make sure owner is valid & exists ...


module.exports = function( app ){

	// todo create
	// todo get
	// todo update
	// todo delete

	app.post('/api/user/create', valid_user.create, function (req, res) {

		api_user_create(req.body.user, function(error, newUser){
			
			if(error){
				return exit(res,422,error.message,error);
			}

			let newToken = admin_auth.create(newUser);

			// todo never return password or extra bits!!!! perhaps set this up in the model as show/hide defaults?

			return exit(res,200,'Success User created.',{ account : newUser , token : newToken });
		});
	});

	app.post('/api/user/login', valid_user.login, function (req, res) {

		api_user_login(req.body.user, function(error, newUser){

			if(error){
				return exit(res,422,error.message,error);
			}

			let newToken = admin_auth.create(newUser);

			// todo never return password or extra bits!!!! perhaps set this up in the model as show/hide defaults?

			return exit(res,200,'Success User login.',{ account : newUser , token : newToken });
		});
	});
	// app.get('/api/job/:job', job.get, function (req, res) {

	// 	api_job_get.get(req.body.job, function(error, job){

	// 		if(error){
	// 			return exit(res,422,error.message,error);
	// 		}
				
	// 		return exit(res,200,'Success job found.',{ job : job });
	// 	});
	// });

	// app.post('/api/job/create', job.create, function (req, res) {

	// 	api_job_create.create(req.body.job, function(error, new_model){

	// 		if(error){
	// 			return exit(res,422,error.message,error);
	// 		}

	// 		return exit(res,201,'Success new job created.',{ job : new_model });

	// 	});
	// });

	// app.put('/api/job/:job', job.update, function (req, res) {

	// 	api_job_update.update(req.body.job, function(error, new_model){

	// 		if(error){
	// 			return exit(res,422,error.message,error);
	// 		}

	// 		return exit(res,201,'Success job updated.',{ job : new_model });

	// 	});
	// });

	// app.delete('/api/job/:job', job.get, function (req, res) {

	// 	api_job_remove.remove(req.body.job, function(error, job){

	// 		if(error){
	// 			return exit(res,422,error.message,error);
	// 		}
				
	// 		return exit(res,200,'Success job removed.',{ job : job });
	// 	});
	// });

	return app;

};







