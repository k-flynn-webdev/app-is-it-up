const api_job_create = require('../api/logic/api.job.create.js');
const api_job_update = require('../api/logic/api.job.update.js');
const api_job_remove = require('../api/logic/api.job.remove.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };

process.env.TEST_SUITE = 'api-test';


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
			expect(error.message).toBe('Missing owner.');
		});
	});
	it('creating a job should return', function() {
		api_job_create(temp_job, function(error, result){
			expect(result.url).toBe(temp_job.url);
			expect(result.job_id.toString()).toBe(temp_job.job_id.toString());
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