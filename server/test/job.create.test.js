const jobs_create = require('../services/job/job.create.js');


describe('job create tests', function() {

	it('job create should exist', function() {
		expect(jobs_create).toBeDefined();
	});	
	it('job create should not create a empty job', function() {
		expect(jobs_create()).toBe(false);
	});	
	it('job create should not create a job missing url', function() {
		expect(jobs_create({ owner : '111', time : '111'})).toBe(false);
	});
	it('job create should not create a job missing time', function() {
		expect(jobs_create({ url : '11', owner : '111' })).toBe(false);
	});
	it('job create should not create a job missing owner', function() {
		expect(jobs_create({ url : '11', time : '111'})).toBe(false);
	});
	it('job create should not create a invalid job', function() {
		expect(jobs_create({ url : '', owner : '', time : ''})).toBe(false);
	});
	it('job create should return a valid job', function() {
		let temp = { url : '11', owner : '111', time : '111'};
		let result = jobs_create(temp);
		expect(result.url).toBe(temp.url);
		expect(result.owner).toBe(temp.owner);
		expect(result.time).toBe(temp.time);
		expect(result.job_id).toBeDefined();
	});

});