const jobs_create = require('../services/job/job.create.js');

// let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };
let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11' };

process.env.TEST_SUITE = 'create-test';


describe('job create tests', function() {

	it('job create should exist', function() {
		expect(jobs_create).toBeDefined();
	});	
	it('job create should not create a empty job', function() {
		jobs_create(null, function(error,result){
			expect(error.message).toBe('Missing information.');
		});
	});	
	it('job create should not create a job missing url', function() {
		let tmp = { owner: temp_job.owner, time: temp_job.time };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Missing url.');
		});
	});
	it('job create should not create a job with invalid url', function() {
		let tmp = { url: 'localh', owner: temp_job.owner, time: temp_job.time };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Invalid url.');
		});
	});	
	it('job create should not create a job with invalid url', function() {
		let tmp = { url: 'google.c', owner: temp_job.owner, time: temp_job.time };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Invalid url.');
		});
	});	
	it('job create should not create a job missing time', function() {
		let tmp = { url: temp_job.url, owner: temp_job.owner };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Missing time.');
		});
	});
	it('job create should not create a job missing owner', function() {
		let tmp = { url: temp_job.url, time: temp_job.time };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Missing owner.');
		});
	});
	it('job create should not create a job with malformed owner <', function() {
		let tmp = { url: temp_job.url, owner: '5d8cc974f14001679cb90ca', time: temp_job.time };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Invalid owner.');
		});
	});	
	it('job create should not create a job with malformed owner >', function() {
		let tmp = { url: temp_job.url, owner: '5d8cc974f14001679cb90ca11', time: temp_job.time };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Invalid owner.');
		});
	});			
	it('job create should not create a invalid job', function() {
		let tmp = { url: '', owner: '', time: '' };
		jobs_create(tmp, function(error,result){
			expect(error.message).toBe('Missing url.');
		});
	});
	it('job create should return', function() {
		jobs_create(temp_job, function(error,result){
			expect(result.url).toBe(temp_job.url);
			expect(result.method).toBe('GET');
			expect(result.pings).toEqual(expect.any(Array));
			expect(result.owner.toString()).toBe(temp_job.owner.toString());
			expect(Number.isNaN(result.job_id)).toBe(false);
		});
	});
	it('job create should return method (post)', function() {
		temp_job.method = 'post';
		jobs_create(temp_job, function(error,result){
			expect(result.method).toBe('POST');
		});
	});	
	it('job create should return method (put)', function() {
		temp_job.method = 'put';
		jobs_create(temp_job, function(error,result){
			expect(result.method).toBe('PUT');
		});
	});
	it('job create should return method (delete)', function() {
		temp_job.method = 'delete';
		jobs_create(temp_job, function(error,result){
			expect(result.method).toBe('DELETE');
		});
	});	
});

