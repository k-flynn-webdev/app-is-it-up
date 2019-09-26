const path = require('path');
const logger = require(path.join('..', 'helpers', 'logger.js'));


module.exports = function( app ){

	process.on('uncaughtException', (error, promise) => {
		logger.log(error);

		process.exit(1); // exit application
	});

	return app;

};