const global_jobs = require('../services/global.jobs.js');
const jobs_create = require('../services/job/job.create.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };

process.env.TEST_SUITE = 'gobal-test';


describe('global jobs tests', function() {

	it('global jobs exec should exist', function() {
		expect(global_jobs.exec_all).toBeDefined();
	});	
	it('global jobs exec should return an array of results', function() {
		global_jobs.exec_all(1, function(result){
			expect(result).toEqual(expect.any(Array));
		});
	});
	it('global jobs should not insert duplicate jobs', function() {
		expect(global_jobs.insert(temp_job)).toBe(true);
		expect(global_jobs.insert(temp_job)).toBe(false);
	});
	it('global jobs should find a job', function() {
		expect(global_jobs.find(temp_job.job_id)).toBe(0);
	});
	it('global jobs should return array of all jobs by owner', function() {
		expect(global_jobs.find_owner(temp_job.owner)).toEqual(expect.any(Array));
	});
	it('global jobs should update a job', function() {
		let new_job = Object.assign({},temp_job);
		new_job.url = 'test.com';
		expect(global_jobs.update(new_job)).toBe(true);
	});	
	it('global jobs should remove a job', function() {
		expect(global_jobs.remove(temp_job)).toBe(true);
	});
	it('global jobs should warn on removing a missing job', function() {
		expect(global_jobs.remove(temp_job)).toBe(false);
	});	
	it('global jobs should not update a missing job', function() {
		let new_job = Object.assign({},temp_job);
		new_job.url = 'tes1111t.com';
		expect(global_jobs.update(new_job)).toBe(false);
	});
});