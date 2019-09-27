const global_jobs = require('../services/global.jobs.js');
const jobs_create = require('../services/job/job.create.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11'};

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
	it('global jobs should remove a job', function() {
		expect(global_jobs.remove(temp_job)).toBe(true);
	});	
	// todo update jobs
	// todo get jobs

});