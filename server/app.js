"use strict";
process.stdout.write('\n');	

const path = require('path');
const express = require('express');
const loader = path.join(__dirname, 'loaders', 'loaders.js');
const config = require(path.join(__dirname, 'config', 'config.js'));
const logger = require(path.join(__dirname, 'helpers', 'logger.js'));
const app = express();


// temp for devving
if( process.env.NODE_ENV === 'development' ){
	app.use(express.static('public'));
}

async function start() {

	await require(loader)(app).catch(function(err){
		logger.log(err);
		process.exit(1);
		return;
	})

	app.listen(config.port, err => {

		if (err) {
			logger.log(err);
			process.exit(1);
			return;
		}

	process.stdout.write(`
	################################################
		Server listening: ${config.ip}:${config.port}
		- mode: ${config.node_env}
	################################ ver: ${config.version} ####\n\n`);
	});

}

start();

module.exports = app; // for testing


