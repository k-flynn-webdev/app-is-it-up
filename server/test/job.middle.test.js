const job = require('../api/middlewares/job.js');

let temp_job = { url : 'https://www.google.com/', user : '5d8cc974f14001679cb90caf', time : 212, job_id : 247259029 };

process.env.TEST_SUITE = 'middle-job-test';


describe('Middleware Job', function() {

	it('create should exist', function() {
		expect(job.create).toBeDefined();
	});	
	it('get should exist', function() {
		expect(job.get).toBeDefined();
	});	
	it('update should exist', function() {
		expect(job.update).toBeDefined();
	});	
	it('exists should return', function() {
		expect(job.exists).toBeDefined();
	});	

	it('get should error on missing job id param', function() {
		job.get({}, function(error,result){
			expect(error.message).toBe('Missing job id.');
		});
	});
	it('get should add job id param to main body', function() {
		let tmp = { params : { job : temp_job.job_id }, body : {}};
		job.get(tmp, null, function(first,second){
			expect(tmp.body.job.job_id.toString()).toBe(temp_job.job_id.toString());		
		});
	});

	it('create should error on missing url', function() {
		job.create({ body : { time : temp_job.time, user: temp_job.user }}, function(error,result){
			expect(error.message).toBe('Missing url property.');
		});
	});
	it('create should error on missing time', function() {
		job.create({ body : { url : temp_job.url, user: temp_job.user }}, function(error,result){
			expect(error.message).toBe('Missing time property.');
		});
	});
	it('create should error on user time', function() {
		job.create({ body : { url : temp_job.url, time: temp_job.time }}, function(error,result){
			expect(error.message).toBe('Missing user property.');
		});
	});
	it('create should error on empty properties', function() {
		job.create({ body : { url : '', time : '', user: '' }}, function(error,result){
			expect(error.message).toBe('Missing url property.');
		});
	});
	it('create should edit the body with a new job object', function() {
		let tmp = { body : { url : temp_job.url, time : temp_job.time, user: temp_job.user }};
		job.create(tmp, null, function(first,second){
			expect(tmp.body.job.url).toBe(tmp.body.url);	
			expect(tmp.body.job.method).toBe('GET');	
			expect(tmp.body.job.time.toString()).toBe(tmp.body.time.toString());	
			expect(tmp.body.job.user.toString()).toBe(tmp.body.user.toString());	
		});
	});

	it('update requires a id and user regardless', function() {
		let tmp = { params : { job : temp_job.job_id }, body : temp_job};
		job.update(tmp, null, function(result){
			expect(tmp.body.job.url).toBe(temp_job.url);	
			expect(tmp.body.job.time.toString()).toBe(temp_job.time.toString());	
			expect(tmp.body.job.user.toString()).toBe(temp_job.user.toString());	
		});
	});
	
});

