const array = require('../services/jobs/jobs.array.js');

let temp_job = { url : 'https://www.google.com/', user : '5d8cc974f14001679cb90caf', active: true, time : 300, job_id : 247259029 };
let tmp2 = Object.assign({},temp_job);
let tmp3 = Object.assign({},temp_job);
tmp2.job_id = 57823;
tmp3.job_id = 11312;

process.env.TEST_SUITE = 'gobal-test';


describe('Jobs Array', function() {

	it('jobs funcs should exist', function() {
		expect(array.get_jobs).toBeDefined();
		expect(array.find_job).toBeDefined();
		expect(array.find_user).toBeDefined();
		expect(array.insert).toBeDefined();
		expect(array.update).toBeDefined();
		expect(array.remove).toBeDefined();
	});

	it('finding a job that doesnt exist should return -1', function() {
		expect(array.find_job(temp_job.job_id)).toEqual(-1);
	});
	it('insert a new job should succeed', function() {
		expect(array.insert(temp_job)).toBe(true);
		expect(array.insert(tmp2)).toBe(true);
	});
	it('finding a job should return an index', function() {
		expect(array.find_job(temp_job.job_id)).toBeGreaterThan(-1);
	});
	it('finding a jobs via user should return an array of 2', function() {
		expect(array.find_user(temp_job.user)).toHaveLength(2);
	});
	it('insert a duplicate job should fail', function() {
		expect(array.insert(temp_job)).toBe(false);
	});
	it('updating a job should return', function() {
		let tmp_url = 'comepletely_new.com';
		expect(array.get_jobs()[0].url).toBe(temp_job.url);
		temp_job.url = tmp_url;
		expect(array.update(temp_job)).toBe(true);
		expect(array.get_jobs()[0].url).toEqual(tmp_url);
	});
	it('removing a job should succeed', function() {
		expect(array.remove(temp_job)).toBe(true);
	});
	it('removing a job job that doesnt exist should fail', function() {
		expect(array.remove(temp_job)).toBe(false);
	});

});