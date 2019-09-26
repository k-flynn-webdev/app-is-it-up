const api_job_create = require('../api/logic/api.job.create.js');
// const jobs_create = require('../services/job/job.create.js');


describe('job api tests', function() {

	let temp_job = { url : 'weqew', props : '', time: '3123', owner : '5d8cc974f14001679cb90caf'};

	it('job api should exist', function() {
		expect(api_job_create).toBeDefined();
	});		
	it('sending an empty job should fail', function() {
		api_job_create(null, function(error, result){
			expect(error.message).toBe('Missing information.');
		});
	});
	it('sending a partial job should fail', function() {
		api_job_create({ url : 'weqew', time: '3123'}, function(error, result){
			expect(error.message).toBe('Missing information.');
		});
	});
	it('sending a job should return', function() {
		api_job_create(temp_job, function(error, result){
			expect(result.url).toBe(temp_job.url);
			expect(result.owner.toString()).toBe(temp_job.owner.toString());
		});
	});
	it('sending a duplicate job should error', function() {
		api_job_create(temp_job, function(error, result){
			expect(error.message).toBe('Already exists.');
		});
	});

	// todo
	// get
	// update
	// remove

});