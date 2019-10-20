const jobs = require('../api/logic/job/api.job.create.js');

let temp_job = { url : 'https://www.google.com/', active: true, method : '', params : '', user : '5d8cc974f14001679cb90caf', ping : 123, job_id : 1697179240 };

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

	it('job create should error with invalid ping', function() {
		let tmp = Object.assign({},temp_job);
		tmp.ping = 'qwwsqw';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid ping.');
		});
	});
	it('job create should return correct ping', function() {
		let tmp = Object.assign({},temp_job);
		tmp.ping = 512;
		jobs.create_model(tmp, function(error,result){
			expect(result.ping.toString()).toBe(tmp.ping.toString());
		});
	});
	it('job create should return correct ping', function() {
		let tmp = Object.assign({},temp_job);
		tmp.ping = 95184;
		jobs.create_model(tmp, function(error,result){
			expect(result.ping.toString()).toBe(tmp.ping.toString());
		});
	});

	it('job create should error with invalid user <', function() {
		let tmp = Object.assign({},temp_job);
		tmp.user = '5d8cc974f14001679cb90ca';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid user.');
		});
	});
	it('job create should error with invalid user >', function() {
		let tmp = Object.assign({},temp_job);
		tmp.user = '5d8cc974f14001679cb90caf1';
		jobs.create_model(tmp, function(error,result){
			expect(error.message).toBe('Invalid user.');
		});
	});

	it('job create should return with a valid object', function() {
		let tmp = Object.assign({},temp_job);
		jobs.create_model(tmp, function(error,result){
			expect(result.url).toBe(tmp.url);
			expect(result.method).toBe('GET');
			expect(result.active).toBe(true);
			expect(result.status).toBe(true);
			expect(result.ping.toString()).toBe(tmp.ping.toString());
			expect(result.user.toString()).toBe(tmp.user.toString());
			expect(result.job_id.toString()).toBe(tmp.job_id.toString());
			expect(Number.isNaN(result.job_id)).toBe(false);
			expect(result.fails).toEqual(expect.any(Array));
		});
	});
	
});

