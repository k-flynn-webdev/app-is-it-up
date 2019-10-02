const array = require('../services/jobs/jobs.array.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : 300, job_id : 247259029 };
let tmp = {job_id:213123, owner : 'sameOwnerIdHere124424'};
let tmp2 = {job_id:-757299, owner : 'sameOwnerIdHere124424'};

process.env.TEST_SUITE = 'gobal-test';


describe('Jobs Array', function() {

	it('jobs funcs should exist', function() {
		expect(array.get_jobs).toBeDefined();
		expect(array.find_job).toBeDefined();
		expect(array.find_owner).toBeDefined();
		expect(array.insert).toBeDefined();
		expect(array.update).toBeDefined();
		expect(array.remove).toBeDefined();
	});

	it('finding a job that doesnt exist should return -1', function() {
		expect(array.find_job(tmp.job_id)).toEqual(-1);
	});
	it('insert a new job should succeed', function() {
		expect(array.insert(tmp)).toBe(true);
		expect(array.insert(tmp2)).toBe(true);
	});
	it('finding a job should return an index', function() {
		expect(array.find_job(tmp.job_id)).toBeGreaterThan(-1);
	});
	it('finding a jobs via owner should return an array of 2', function() {
		expect(array.find_owner(tmp.owner)).toHaveLength(2);
	});
	it('insert a duplicate job should fail', function() {
		expect(array.insert(tmp)).toBe(false);
	});
	it('updating a job should return', function() {
		let tmp_name = 'new_name';
		let tmp3 = Object.assign({name : tmp_name},tmp);
		expect(array.get_jobs()[0].name).toBeUndefined();
		expect(array.update(tmp3)).toBe(true);
		expect(array.get_jobs()[0].name).toEqual(tmp_name);
	});
	it('removing a job should succeed', function() {
		expect(array.remove(tmp)).toBe(true);
	});
	it('removing a job job that doesnt exist should fail', function() {
		expect(array.remove(tmp)).toBe(false);
	});

});