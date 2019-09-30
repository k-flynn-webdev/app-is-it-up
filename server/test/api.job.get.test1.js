// const mongoose = require('mongoose');
const job_get = require('../services/job/job.get.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11'};

process.env.TEST_SUITE = 'get-test';


describe('job create tests', function() {

	it('job get should exist', function() {
		expect(job_get).toBeDefined();
	});	
});

