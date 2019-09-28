const global_tick = require('../services/global.jobs.tick.js');

process.env.TEST_SUITE = 'tick-test';


describe('global tick tests', function() {

	it('global tick should start on command', function() {
		expect(global_tick.start()).toBe(true);
	});
	it('global tick should stop on command', function() {
		expect(global_tick.stop()).toBe(true);
	});
	it('global tick should stop on command', function() {
		expect(global_tick.stop()).toBe(true);
	});	
});