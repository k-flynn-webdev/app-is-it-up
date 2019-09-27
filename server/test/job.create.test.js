const jobs_create = require('../services/job/job.create.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11'};


describe('job create tests', function() {

	it('job create should exist', function() {
		expect(jobs_create).toBeDefined();
	});	
	it('job create should not create a empty job', function() {
		expect(jobs_create()).toBe(false);
	});	
	it('job create should not create a job missing url', function() {
		let new_job = { owner :temp_job.owner, time: temp_job.time };
		expect(jobs_create(new_job)).toBe(false);
	});
	it('job create should not create a job missing time', function() {
		let new_job = { owner :temp_job.owner, time: temp_job.time };
		expect(jobs_create({ url : temp_job.url, owner : temp_job.owner })).toBe(false);
	});
	it('job create should not create a job missing owner', function() {
		expect(jobs_create({ url : temp_job.url, time : temp_job.time})).toBe(false);
	});
	it('job create should not create a job with malformed owner <', function() {
		expect(jobs_create({ url : temp_job.url, time : temp_job.time, owner : '5d8cc974f14001679cb90ca' })).toBe(false);
	});
	it('job create should not create a job with malformed owner >', function() {
		expect(jobs_create({ url : temp_job.url, time : temp_job.time, owner : '5d8cc974f14001679cb90caf1' })).toBe(false);
	});		
	it('job create should not create a invalid job', function() {
		expect(jobs_create({ url : '', owner : '', time : ''})).toBe(false);
	});
	it('job create should return false on a invalid url', function() {
		expect(jobs_create({ url : 'google', owner : temp_job.owner, time : temp_job.time})).toBe(false);
	});
	it('job create should return false on a invalid url', function() {
		expect(jobs_create({ url : 'local', owner : temp_job.owner, time : temp_job.time})).toBe(false);
	});	
	it('job create should return false on a invalid url', function() {
		expect(jobs_create({ url : 'http://thingyo', owner : temp_job.owner, time : temp_job.time})).toBe(false);
	});	
	it('job create should return false on a invalid url', function() {
		expect(jobs_create({ url : 'google.c', owner : temp_job.owner, time : temp_job.time})).toBe(false);
	});	
	it('job create should return', function() {
		let result = jobs_create(temp_job);
		expect(result.url).toEqual(temp_job.url);
		expect(result.owner).toEqual(temp_job.owner);
	});	
	it('job create should return method (get)', function() {
		temp_job.method = 'get';
		let result = jobs_create(temp_job);
		expect(result.method).toEqual('GET');
	});	
	it('job create should return method (post)', function() {
		temp_job.method = 'post';
		let result = jobs_create(temp_job);
		expect(result.method).toEqual('POST');
	});	
	it('job create should return method (put)', function() {
		temp_job.method = 'put';
		let result = jobs_create(temp_job);
		expect(result.method).toEqual('PUT');
	});
	it('job create should return method (delete)', function() {
		temp_job.method = 'delete';
		let result = jobs_create(temp_job);
		expect(result.method).toEqual('DELETE');
	});		
});

