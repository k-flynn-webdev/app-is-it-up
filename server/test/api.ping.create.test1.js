const ping_create = require('../services/ping/ping.create.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };
let temp_ping = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', status : 12 };

process.env.TEST_SUITE = 'create-ping-test';


describe('ping create tests', function() {

	it('ping create should exist', function() {
		expect(ping_create).toBeDefined();
	});	
	it('ping create should not create a empty result', function() {
		ping_create(null, null, function(error,result){
			expect(error.message).toBe('Missing job.');
		});
	});
	it('ping create should not create a empty result', function() {
		ping_create({}, null, function(error,result){
			expect(error.message).toBe('Missing ping.');
		});
	});	
	it('ping create should not create a empty result', function() {
		ping_create(temp_job, temp_ping, function(error,result){
			expect(result.url).toBe(temp_ping.url);
			expect(result.job_id.toString()).toBe(temp_job.job_id.toString());
			expect(result.owner.toString()).toBe(temp_ping.owner.toString());
			expect(result.status).toBe(temp_ping.status);
		});
	});
});

