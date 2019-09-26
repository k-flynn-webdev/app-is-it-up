const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

let testing = process.env.NODE_ENV === 'test';

let temp_dir = path.join(__dirname, '..', 'log');

if (!fs.existsSync(temp_dir)){
	fs.mkdirSync(temp_dir);
}

let accessLogStream = null;
let morganType = null;

// create a write stream (in append mode)
if( !testing ){
	accessLogStream = fs.createWriteStream(path.join(temp_dir, 'log'), { flags: 'a' })
	morganType = ':date[iso] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';
}


function init( app ) {
	if( testing ){
		return;
	}
	app.use( morgan( morganType , { stream: accessLogStream }));
	app.use( morgan( morganType ));
}
exports.init = init;


function log( line ){
	if( testing ){
		return;
	}
	if( line.message !== undefined ){
		line = line.message;
	}
	if( !line.endsWith('\n') ){
		line = line + '\n';
	}
	// if( process.env.NODE_ENV.toLowerCase() !== 'production'){
		process.stdout.write( line );
	// }
	accessLogStream.write( line );

	// make sure line ends with \n

}
exports.log = log;



