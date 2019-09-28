const jobs_exec = require('../services/job/job.exec.js');
const jobs_create = require('../services/job/job.create.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11'};

process.env.TEST_SUITE = 'exec-test';


describe('job exec tests', function() {

	it('job exec should exist', function() {
		expect(jobs_exec).toBeDefined();
	});	
	// it('running no job should fail', function() {
	// 	jobs_exec(null, function(result){
	// 		expect(result).toBe(false);
	// 	});
	// });
	// it('running a job to google.com should pass', function() {
		// let tmp = jobs_create(temp_job);
		// jobs_exec(tmp, function(result){
			// expect(result).toBe(true);
		// });
	// });

	// it('global jobs exec should return an array of results', function() {
	// 	let result = global_jobs.exec(1);
	// 	expect(result).toEqual(expect.any(Array));
	// });
	// it('global jobs should not insert duplicate jobs', function() {
	// 	let temp = jobs_create({ url : '11', owner : '11231', time : '12311'});
	// 	expect(global_jobs.insert(temp)).toBe(true);
	// 	expect(global_jobs.insert(temp)).toBe(false);
	// });
	// it('global jobs should remove a job', function() {
	// 	let temp = jobs_create({ url : '11213', owner : '1111', time : '155311'});
	// 	expect(global_jobs.insert(temp)).toBe(true);
	// 	expect(global_jobs.remove(temp)).toBe(true);
	// });	
	// todo update

});