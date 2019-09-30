const jobs = require('../api/logic/job/api.job.create.js');

let temp_job = { url : 'https://www.google.com/', method : '', props : '', owner : '5d8cc974f14001679cb90caf', time : 123, job_id : 1697179240 };

process.env.TEST_SUITE = 'create-test';


describe('Create', function() {

	it('create should exist', function() {
		expect(jobs.create).toBeDefined();
		expect(jobs.create_model).toBeDefined();
	});

	it('job create should error with invalid url', function() {
		let tmp = Object.assign({},temp_job);
		tmp.url = 'google';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid URL.');
		});
	});	
	it('job create should error with invalid url', function() {
		let tmp = Object.assign({},temp_job);
		tmp.url = 'google.c';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid URL.');
		});
	});

	it('job create should default (GET) with invalid method', function() {
		let tmp = Object.assign({},temp_job);
		tmp.method = 'qwwsqw';
		jobs.create_model(tmp, function(error,result){
			expect(result.method).toBe('GET');
		});
	});
	it('job create should return POST with post method', function() {
		let tmp = Object.assign({},temp_job);
		tmp.method = 'post';
		jobs.create_model(tmp, function(error,result){
			expect(result.method).toBe('POST');
		});
	});
	it('job create should return PUT with put method', function() {
		let tmp = Object.assign({},temp_job);
		tmp.method = 'put';
		jobs.create_model(tmp, function(error,result){
			expect(result.method).toBe('PUT');
		});
	});
	it('job create should return DELETE with delete method', function() {
		let tmp = Object.assign({},temp_job);
		tmp.method = 'delete';
		jobs.create_model(tmp, function(error,result){
			expect(result.method).toBe('DELETE');
		});
	});

	it('job create should error with invalid time', function() {
		let tmp = Object.assign({},temp_job);
		tmp.time = 'qwwsqw';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid time.');
		});
	});
	it('job create should return correct time', function() {
		let tmp = Object.assign({},temp_job);
		tmp.time = 512;
		jobs.create_model(tmp, function(error,result){
			expect(result.time.toString()).toBe(tmp.time.toString());
		});
	});
	it('job create should return correct time', function() {
		let tmp = Object.assign({},temp_job);
		tmp.time = 95184;
		jobs.create_model(tmp, function(error,result){
			expect(result.time.toString()).toBe(tmp.time.toString());
		});
	});

	it('job create should error with invalid owner <', function() {
		let tmp = Object.assign({},temp_job);
		tmp.owner = '5d8cc974f14001679cb90ca';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid owner.');
		});
	});
	it('job create should error with invalid owner >', function() {
		let tmp = Object.assign({},temp_job);
		tmp.owner = '5d8cc974f14001679cb90caf1';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid owner.');
		});
	});

	it('job create should return with a valid object', function() {
		let tmp = Object.assign({},temp_job);
		jobs.create_model(tmp, function(error,result){
			expect(result.url).toBe(tmp.url);
			expect(result.method).toBe('GET');
			expect(result.active).toBe(true);
			expect(result.time.toString()).toBe(tmp.time.toString());
			expect(result.owner.toString()).toBe(tmp.owner.toString());
			expect(result.job_id.toString()).toBe(tmp.job_id.toString());
		});
	});



	// it('job create should not create a invalid job', function() {
	// 	let tmp = { url: '', owner: '', time: '' };
	// 	jobs_create(tmp, function(error,result){
	// 		expect(error.message).toBe('Missing url.');
	// 	});
	// });
	// it('job create should return', function() {
	// 	jobs_create(temp_job, function(error,result){
	// 		expect(result.url).toBe(temp_job.url);
	// 		expect(result.method).toBe('GET');
	// 		expect(result.pings).toEqual(expect.any(Array));
	// 		expect(result.owner.toString()).toBe(temp_job.owner.toString());
	// 		expect(Number.isNaN(result.job_id)).toBe(false);
	// 	});
	// });
	// it('job create should return method (post)', function() {
	// 	temp_job.method = 'post';
	// 	jobs_create(temp_job, function(error,result){
	// 		expect(result.method).toBe('POST');
	// 	});
	// });	
	// it('job create should return method (put)', function() {
	// 	temp_job.method = 'put';
	// 	jobs_create(temp_job, function(error,result){
	// 		expect(result.method).toBe('PUT');
	// 	});
	// });
	// it('job create should return method (delete)', function() {
	// 	temp_job.method = 'delete';
	// 	jobs_create(temp_job, function(error,result){
	// 		expect(result.method).toBe('DELETE');
	// 	});
	// });	
});

