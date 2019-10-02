const timer = require('../services/jobs/jobs.timer.js');

process.env.TEST_SUITE = 'timer-test';


describe('Timer', function() {

	it('timer funcs should exist', function() {
		expect(timer.start).toBeDefined();
		expect(timer.stop).toBeDefined();
		expect(timer.get_mode).toBeDefined();
	});
	it('timer should start on command', function() {
		expect(timer.get_mode()).toBe('stop');
		expect(timer.start()).toBe(true);
		expect(timer.get_mode()).toBe('in-progress');
	});
	it('timer should stop on command', function() {
		expect(timer.get_mode()).toBe('in-progress'); 
		expect(timer.stop()).toBe(true);
		expect(timer.get_mode()).toBe('stop');
	});		
	it('timer should still stop on command', function() {
		expect(timer.get_mode()).toBe('stop');
		expect(timer.stop()).toBe(true);
		expect(timer.get_mode()).toBe('stop');
	});	

});