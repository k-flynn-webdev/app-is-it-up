const jobs = require('../api/logic/job/api.job.shared.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : '1sgn11', job_id : 247259029 };

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

	it('valid should fail missing time', function() {
		expect(jobs.valid.time('')).toBe(false);
	});
	it('valid should fail on invalid time', function() {
		expect(jobs.valid.time('12go1')).toBe(false);
	});
	it('valid should fail on invalid time', function() {
		expect(jobs.valid.time('12.2')).toBe(false);
	});	
	it('valid should fail on invalid time', function() {
		expect(jobs.valid.time(234.1)).toBe(false);
	});
	it('valid should return on valid time', function() {
		expect(jobs.valid.time(12)).toBe(12);
	});
	it('valid should return on valid time', function() {
		expect(jobs.valid.time('31')).toBe(31);
	});
	it('valid should return on valid time', function() {
		expect(jobs.valid.time('-45631')).toBe(-45631);
	});

	it('valid should fail missing owner', function() {
		expect(jobs.valid.owner('')).toBe(false);
	});
	it('valid should fail on invalid owner', function() {
		expect(jobs.valid.owner('random123123')).toBe(false);
	});
	it('valid should fail on malformed owner <', function() {
		expect(jobs.valid.owner('5d8cc974f14001679cb90ca')).toBe(false);
	});	
	it('valid should fail on malformed owner >', function() {
		expect(jobs.valid.owner('5d8cc974f14001679cb90ca11')).toBe(false);
	});	
	it('valid should return on valid owner >', function() {
		expect(jobs.valid.owner(temp_job.owner.toString())).toBe(temp_job.owner.toString());
	});

	it('valid should fail on empty obj', function() {
		expect(jobs.meta({})).toBe(false);
	});
	it('valid should fail on empty obj', function() {
		expect(jobs.meta('')).toBe(false);
	});
	it('valid should return obj', function() {
		let tmp = jobs.meta({ time : 200 });
		expect(tmp.max).toBe(12960);
		expect(tmp.num).toBe(0);
		expect(isValidDate(tmp.next)).toBe(true);
	});
	it('valid should return obj', function() {
		let tmp = jobs.meta({ time : 341 });
		expect(tmp.max).toBe(7601);
		expect(tmp.num).toBe(0);
		expect(isValidDate(tmp.next)).toBe(true);
	});
	it('valid should return obj', function() {
		let seconds_day = 60 * 60 * 24;
		let tmp = jobs.meta({ time : seconds_day });
		expect(tmp.max).toBe(30);
		expect(tmp.num).toBe(0);
		expect(isValidDate(tmp.next)).toBe(true);
	});

});


function isValidDate(value) {
	var dateWrapper = new Date(value);
	return !isNaN(dateWrapper.getDate());
}


