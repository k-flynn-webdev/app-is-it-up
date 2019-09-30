const global_timer= require('../services/global.jobs.timer.js');

process.env.TEST_SUITE = 'timer-test';


describe('Timer', function() {

	it('global timer should start on command', function() {
		expect(global_timer.start()).toBe(true);
	});
	it('global timer should stop on command', function() {
		expect(global_timer.stop()).toBe(true);
	});
	it('global timer should stop on command', function() {
		expect(global_timer.stop()).toBe(true);
	});	
});