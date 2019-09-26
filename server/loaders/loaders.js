const path = require('path');
const logger = require(path.join(__dirname, '..' , 'helpers', 'logger.js'));
const expressSettings = require('./express');

const routes = require('./routes.js');
const s_events = require('./server_events.js');
const s_sockets = require('./server_sockets.js');
const subscribers = require('./events.js');
const service_init = require('./init_service.js');
const interface_init = require('./init_interface.js');


module.exports = async (app) => {

	logger.init( app );

	await expressSettings(app).then(function(result) {
		logger.log(result);
	})

	await routes(app).then(function(result) {
		logger.log(result);
	})

	await s_events(app).then(function(result) {
		logger.log(result);
	})

	await s_sockets(app).then(function(result) {
		logger.log(result);
	})
	
	await service_init(app).then(function(result) {
		logger.log(result);
	})

	await interface_init(app).then(function(result) {
		logger.log(result);
	})

	await subscribers(app).then(function(result) {
		logger.log(result);
	})

};


