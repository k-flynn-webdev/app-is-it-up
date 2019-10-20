// const mongoose = require('mongoose');
const job_remove = require('../services/job/job.remove.js');

let temp_job = { url : 'https://www.google.com/', active: true, method : '', params : '', owner : '5d8cc974f14001679cb90caf', ping : 123, job_id : 1697179240 };

process.env.TEST_SUITE = 'get-test';


describe('job remove tests', function() {

	it('job remove should exist', function() {
		expect(job_remove).toBeDefined();
	});	
});

