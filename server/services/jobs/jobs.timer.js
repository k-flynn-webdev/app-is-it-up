// // this is the timing system used to fire all jobs at the correct kick off time.
// // todo listen for stop event?

// let timer = 11; // todo change this to 30 secs in production maybe as env?..
// let delay = 10;
// let modes = ['stop','in-progress'];
// let mode = modes[0];

// let global_tick = null;
// let global_count = 0;
// let app_temp = null;


// function init(app){
// 	app.on('jobs.start', start);
// 	app.on('jobs.stop', stop);
// 	app_temp = app;

// 	setTimeout( function(){
// 		start();
// 	}, delay * 1000);

// }
// exports.init = init;


// function start(){
// 	if(mode !== modes[1]){
// 		mode = modes[1];
// 		tick();
// 	}
// 	return mode === modes[1];
// }
// exports.start = start;

// function stop(){
// 	if(mode !== modes[0]){
// 		mode = modes[0];
// 		clearTimeout(global_tick);	
// 	}
// 	return mode === modes[0];
// }
// exports.stop = stop;


// function tick(){
// 	if(mode !== modes[1]){
// 		clearTimeout(global_tick);
// 		return;
// 	}

// 	if(app_temp !== null){
// 		app_temp.emit('jobs.exec', global_count);
// 	}

// 	global_count+=1;
// 	global_tick = setTimeout( function(){
// 		tick();
// 	}, timer * 1000);
// }


