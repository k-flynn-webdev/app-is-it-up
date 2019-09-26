const job = require('../middlewares/job.js');
const job_create = require('../../services/job/job.create.js');


module.exports = function( app ){

	// app.get('/api/job/:job', function (req,res) {

	// 	request.params.job;
		
	// 	// create job
	// 	// save job
	// });


	app.post('/api/job', job.middle, function (req, res) {




		// create job
		// save job
	});

	return app;

};