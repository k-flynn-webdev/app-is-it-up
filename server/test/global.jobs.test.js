const global_jobs = require('../services/global.jobs.js');
const jobs_create = require('../services/job/job.create.js');


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
		let temp = jobs_create({ url : '11', owner : '11231', time : '12311'});
		expect(global_jobs.insert(temp)).toBe(true);
		expect(global_jobs.insert(temp)).toBe(false);
	});
	it('global jobs should remove a job', function() {
		let temp = jobs_create({ url : '11213', owner : '1111', time : '155311'});
		expect(global_jobs.insert(temp)).toBe(true);
		expect(global_jobs.remove(temp)).toBe(true);
	});	
	// todo update

});