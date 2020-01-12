const jobs = require('../api/logic/job/api.job.get.js');
const create = require('../api/logic/job/api.job.create.js');

let temp_job = { url : 'https://www.google.com/', active: true, method : '', params : '', user : { id: '5d8cc974f14001679cb90caf', name: 'sdfsdf'}, ping : 123, job_id : 1697179240 };

process.env.TEST_SUITE = 'get-test';


describe('Get', function() {

	it('get should exist', function() {
		expect(jobs.get).toBeDefined();
	});
	
});

