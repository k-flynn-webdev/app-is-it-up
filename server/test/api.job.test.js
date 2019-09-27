const api_job_create = require('../api/logic/api.job.create.js');

let temp_job = { url : 'https://www.google.com/', owner : '3d8cc974f14001679cb90caf', time : '13123'};

describe('job api tests', function() {

	it('job api should exist', function() {
		expect(api_job_create).toBeDefined();
	});		
	it('creating an empty job should fail', function() {
		api_job_create(null, function(error, result){
			expect(error.message).toBe('Missing information.');
		});
	});
	it('creating a partial job should fail', function() {
		api_job_create({ url : temp_job.url, time: temp_job.time}, function(error, result){
			expect(error.message).toBe('Missing information.');
		});
	});
	it('creating a job should return', function() {
		api_job_create(temp_job, function(error, result){
			expect(result.url).toBe(temp_job.url);
			expect(result.owner.toString()).toBe(temp_job.owner.toString());
		});
	});
	it('creating a duplicate job should error', function() {
		api_job_create(temp_job, function(error, result){
			expect(error.message).toBe('Already exists.');
		});
	});

	// todo
	// get
	// update
	// remove

});