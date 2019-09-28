const jobs_update = require('../services/job/job.update.js');

// let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };
let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };

process.env.TEST_SUITE = 'update-test';


describe('job update tests', function() {

	it('job update should exist', function() {
		expect(jobs_update).toBeDefined();
	});	
	it('job update should not update a empty job', function() {
		jobs_update(null, function(error,result){
			expect(error.message).toBe('Missing information.');
		});
	});	
	it('job update should not update a job missing url', function() {
		let tmp = { owner: temp_job.owner, time: temp_job.time, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Missing url.');
		});
	});
	it('job update should not update a job with invalid url', function() {
		let tmp = { url: 'localh', owner: temp_job.owner, time: temp_job.time, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Invalid url.');
		});
	});	
	it('job update should not update a job with invalid url', function() {
		let tmp = { url: 'google.c', owner: temp_job.owner, time: temp_job.time, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Invalid url.');
		});
	});	
	it('job update should not update a job missing time', function() {
		let tmp = { url: temp_job.url, owner: temp_job.owner, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Missing time.');
		});
	});
	it('job update should not update a job missing owner', function() {
		let tmp = { url: temp_job.url, time: temp_job.time, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Missing owner.');
		});
	});
	it('job update should not update a job with malformed owner <', function() {
		let tmp = { url: temp_job.url, owner: '5d8cc974f14001679cb90ca', time: temp_job.time, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Invalid owner.');
		});
	});	
	it('job update should not update a job with malformed owner >', function() {
		let tmp = { url: temp_job.url, owner: '5d8cc974f14001679cb90ca11', time: temp_job.time, job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Invalid owner.');
		});
	});			
	it('job update should not update a invalid job', function() {
		let tmp = { url: '', owner: '', time: '', job_id : 247259029 };
		jobs_update(tmp, function(error,result){
			expect(error.message).toBe('Missing url.');
		});
	});
	it('job update should return', function() {
		temp_job.url = 'www.newurl.com';
		jobs_update(temp_job, function(error,result){
			expect(result.url).toBe('http://' + temp_job.url);
			expect(result.method).toBe('GET');
			expect(result.pings).toEqual(expect.any(Array));
			expect(result.owner.toString()).toBe(temp_job.owner.toString());
			expect(result.job_id.toString()).toBe(temp_job.job_id.toString());
		});
	});
	it('job update should return method (post)', function() {
		temp_job.method = 'post';
		jobs_update(temp_job, function(error,result){
			expect(result.method).toBe('POST');
		});
	});	
	it('job update should return method (put)', function() {
		temp_job.method = 'put';
		jobs_update(temp_job, function(error,result){
			expect(result.method).toBe('PUT');
		});
	});
	it('job update should return method (delete)', function() {
		temp_job.method = 'delete';
		jobs_update(temp_job, function(error,result){
			expect(result.method).toBe('DELETE');
		});
	});	
});

