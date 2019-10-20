const jobs = require('../api/logic/job/api.job.shared.js');

let temp_job = { url : 'https://www.google.com/', active: true, method : '', params : '', user : '5d8cc974f14001679cb90caf', ping : 123, job_id : 1697179240 };

process.env.TEST_SUITE = 'shared-test';


describe('Job Shared', function() {

	it('valid should exist', function() {
		expect(jobs.valid).toBeDefined();
	});

	it('valid should fail on a missing url', function() {
		expect(jobs.valid.url('')).toBe(false);
	});
	it('valid should fail on a broken url', function() {
		expect(jobs.valid.url('11111')).toBe(false);
	});
	it('valid should fail on a broken url', function() {
		expect(jobs.valid.url('google.')).toBe(false);
	});	
	it('valid should return on a valid url', function() {
		expect(jobs.valid.url('google.com')).toEqual('http://google.com');
	});
	it('valid should return on a valid url', function() {
		expect(jobs.valid.url('localhost')).toEqual('http://localhost');
	});

	it('valid should recieve GET on a missing method', function() {
		expect(jobs.valid.method('')).toBe('GET');
	});
	it('valid should recieve GET on a invalid method', function() {
		expect(jobs.valid.method('21312')).toBe('GET');
	});

	it('valid should recieve POST on a put method', function() {
		expect(jobs.valid.method('post')).toBe('POST');
	});
	it('valid should recieve POST on a put method', function() {
		expect(jobs.valid.method('post83')).toBe('POST');
	});

	it('valid should recieve PUT on a put method', function() {
		expect(jobs.valid.method('put')).toBe('PUT');
	});
	it('valid should recieve PUT on a put method', function() {
		expect(jobs.valid.method('put121')).toBe('PUT');
	});

	it('valid should recieve DELETE on a delete method', function() {
		expect(jobs.valid.method('delete')).toBe('DELETE');
	});	
	it('valid should recieve DELETE on a delete method', function() {
		expect(jobs.valid.method('delete213123')).toBe('DELETE');
	});

	it('valid should fail missing job id', function() {
		expect(jobs.valid.id('')).toBe(false);
	});
	it('valid should fail on invalid job id', function() {
		expect(jobs.valid.id('12go1')).toBe(false);
	});
	it('valid should fail on invalid job id', function() {
		expect(jobs.valid.id('12.2')).toBe(false);
	});	
	it('valid should fail on invalid job id', function() {
		expect(jobs.valid.id(234.1)).toBe(false);
	});		
	it('valid should return on valid job id', function() {
		expect(jobs.valid.id(12)).toBe(12);
	});
	it('valid should return on valid job id', function() {
		expect(jobs.valid.id('31')).toBe(31);
	});
	it('valid should return on valid job id', function() {
		expect(jobs.valid.id('-45631')).toBe(-45631);
	});

	it('valid should fail missing ping', function() {
		expect(jobs.valid.ping('')).toBe(false);
	});
	it('valid should fail on invalid ping', function() {
		expect(jobs.valid.ping('12go1')).toBe(false);
	});
	it('valid should fail on invalid ping', function() {
		expect(jobs.valid.ping('12.2')).toBe(false);
	});	
	it('valid should fail on invalid ping', function() {
		expect(jobs.valid.ping(234.1)).toBe(false);
	});
	it('valid should return on valid ping', function() {
		expect(jobs.valid.ping(12)).toBe(12);
	});
	it('valid should return on valid ping', function() {
		expect(jobs.valid.ping('31')).toBe(31);
	});
	it('valid should return on valid ping', function() {
		expect(jobs.valid.ping('-45631')).toBe(-45631);
	});

	it('valid should fail missing user', function() {
		expect(jobs.valid.user('')).toBe(false);
	});
	it('valid should fail on invalid user', function() {
		expect(jobs.valid.user('random123123')).toBe(false);
	});
	it('valid should fail on malformed user <', function() {
		expect(jobs.valid.user('5d8cc974f14001679cb90ca')).toBe(false);
	});	
	it('valid should fail on malformed user >', function() {
		expect(jobs.valid.user('5d8cc974f14001679cb90ca11')).toBe(false);
	});	
	it('valid should return on valid user >', function() {
		expect(jobs.valid.user(temp_job.user.toString())).toBe(temp_job.user.toString());
	});

	it('valid should fail on empty obj', function() {
		expect(jobs.meta({})).toBe(false);
	});
	it('valid should fail on empty obj', function() {
		expect(jobs.meta('')).toBe(false);
	});
	it('valid should return obj', function() {
		let tmp = jobs.meta({ ping : 200 });
		expect(tmp.max).toBe(12960);
		expect(tmp.num).toBe(0);
		expect(isValidDate(tmp.next)).toBe(true);
	});
	it('valid should return obj', function() {
		let tmp = jobs.meta({ ping : 341 });
		expect(tmp.max).toBe(7601);
		expect(tmp.num).toBe(0);
		expect(isValidDate(tmp.next)).toBe(true);
	});
	it('valid should return obj', function() {
		let seconds_day = 60 * 60 * 24;
		let tmp = jobs.meta({ ping : seconds_day });
		expect(tmp.max).toBe(30);
		expect(tmp.num).toBe(0);
		expect(isValidDate(tmp.next)).toBe(true);
	});

	it('valid find should fail on invalid search obj', function() {
		expect(jobs.find).toBeDefined();
		jobs.find({}, function(error,result){
			expect(error.message).toBe('Missing search term.');
		});
	});


	// update model 
	let new_model = Object.assign({url:'newurl.com',ping:3737,method:'delete'},temp_job);
	
	it('update an obj should return a new correctly updated obj', function() {
		expect(jobs.update).toBeDefined();
		let result = jobs.update(temp_job,new_model);
		expect(result.url).toBe(new_model.url);
		expect(result.ping).toBe(new_model.ping);
		expect(result.method).toBe(new_model.method);
	});

});


function isValidDate(value) {
	var dateWrapper = new Date(value);
	return !isNaN(dateWrapper.getDate());
}


