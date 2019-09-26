const path = require('path');
const mongoose = require('mongoose');
const logger = require(path.join('..', 'helpers', 'logger.js'));
const config = require(path.join('..', 'config', 'config.js'));

let db = null;

function init( app ){

	db = mongoose.connect( config.db ,{ useNewUrlParser: true } , function( error ){
		if ( error ){ 
			logger.log( 'Error: db connecting error.' + error ); 
		}
	});
	mongoose.connection.on( 'error' , function( error ){
		if ( error ){ 
			logger.log( 'Error: db connection error.' + error ); 
		}
	});
	mongoose.connection.on( 'disconnected' , function(){
		logger.log( 'Error: db disconnected/closed: ' + config.db + '._');
		disconnect(app);
	});
	mongoose.connection.on( 'connected' , function(){
		connect(app);
		logger.log('	✅ DB connected : ' + config.db );
		return db;
	});	

}
exports.init = init;

function connect( app ){
	setTimeout( function(){
		app.emit('db-on');
	}, 3*1000 );
}
function disconnect( app ){
	app.emit('db-off');
}


