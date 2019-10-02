const exec = require('../services/jobs/jobs.exec.js');

let temp_job = { url : 'https://www.google.com/', method : '', props : '', owner : '5d8cc974f14001679cb90caf', time : 300, job_id : 1697179240 };

process.env.TEST_SUITE = 'exec-test';


describe('Job Exec', function() {

	it('job exec should exist', function() {
		expect(exec.exec).toBeDefined();
		expect(exec.ready).toBeDefined();
		expect(exec.complete).toBeDefined();
	});

	it('job ready should fail a job that has a future date', function() {
		// setting next job to render to be 10 mins in the future ..
		temp_job.meta = { next : Date.now() + (1000 * 60 * 10) };
		expect(exec.ready(new Date(),temp_job)).toBe(false);
		temp_job.meta.next = Date.now() + (1000 * 60 * 100);
		expect(exec.ready(new Date(),temp_job)).toBe(false);	
	});
	it('job ready should pass a job that is behind todays date', function() {
		// setting next job to render to be 10 mins in the past ..
		temp_job.meta = { next : Date.now() - (1000 * 60 * 10) };
		expect(exec.ready(new Date(),temp_job)).toBe(true);
		temp_job.meta.next = Date.now() - (1000 * 60 * 100);
		expect(exec.ready(new Date(),temp_job)).toBe(true);		
	});

	it('job complete should update job num', function() {
		// setting next job to render to be 10 mins in the future ..
		let current = 5;
		temp_job.meta = { next : 0, num : current, max : 10 };
		temp_job.time = 100;
		let new_date = Date.now() + (1000 * temp_job.time);
		exec.complete(temp_job);
		expect(temp_job.meta.num).toBe(current + 1);
		let result13 = Math.abs(temp_job.meta.next - new_date) < 150;
		expect(result13).toBe(true);
	});
	it('job complete should update job num (rollover 10 >> 0)', function() {
		// setting next job to render to be 10 mins in the future ..
		let current = 10;
		temp_job.meta = { next : 0, num : current, max : 10 };
		temp_job.time = 100;
		let new_date = Date.now() + (1000 * temp_job.time);
		exec.complete(temp_job);
		expect(temp_job.meta.num).toBe(0);
		let result13 = Math.abs(temp_job.meta.next - new_date) < 150;
		expect(result13).toBe(true);
	});

	it('job exec should error on a job that has unobtainable web url', function() {
		let tmp = Object.assign({},temp_job);
		tmp.url = "www.googlee.com";
		exec.exec(tmp, function(error,result){
			expect(error.status).toEqual(-1);
		});
	});
	it('job exec should return on a job with valid url', function() {
		let tmp13 = false;
		exec.exec(temp_job, function(error,result){
			if(result.status === 200 || result.status === 201){
				tmp13 = true;
			}
			expect(tmp13).toBe(true);
		});
	});

});