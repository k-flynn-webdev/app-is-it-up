const loop = require('../services/jobs/jobs.loop.js');

let temp_job = { url : 'https://www.google.com/', owner : '5d8cc974f14001679cb90caf', time : 300, job_id : 247259029 };

process.env.TEST_SUITE = 'gobal-test';


describe('Loop', function() {

	it('jobs loop should exist', function() {
		expect(loop.init).toBeDefined();
		expect(loop.exec).toBeDefined();
	});	

	it('jobs loop next iterator should iterate', function() {

		let vars = { i : 3, work : [1,2,3,4,5,6,7,8,9] };
		let has_finished = loop.has_finished.bind(vars);
		let result = has_finished();

		expect(vars.i).toEqual(4);
		expect(result).toEqual(false);
		
		vars.i = vars.work.length;
		let result2 = has_finished();
		expect(vars.i).toEqual(vars.work.length + 1);
		expect(result2).toEqual(true);

	});


	// it('jobs looper should return after iterating', function() {

	// 	function todo(t,next){

	// 		return next(null,true);
	// 	}

	// 	let vars = {
	// 		i : 0, 
	// 		work : [1,2,3] }; 

	// 	let result = [];	

	// 	loop.loop(vars,result);
	// 	expect(result).toBe([]);
		
	// // 	// loop.loop(vars);
	// // 	// expect(vars.i).toBe(2);
	// // 	// loop.loop(vars);
	// // 	// expect(vars.i).toBe(3);
	// });	

});