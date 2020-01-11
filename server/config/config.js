// inject env file vars ..
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

let config_path = path.join(__dirname, '..', 'vars.env');
let app_version = require('../package.json').version;


if ( !fs.existsSync( config_path )) {
	// This error should crash whole process
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const envs = dotenv.config({ path: config_path });
// todo merge all vars found in env.vars with the below object and export dynamicly. 

module.exports = {
	port : parseInt(envs.parsed.PORT, 10),
	ip : envs.parsed.IP,
	version : app_version,
	rate : { 
		time : 10 * 60 * 1000,
		max : 200,
	},
	token : {
		expires : Number(envs.parsed.TOKEN_EXPIRE),
		secret : envs.parsed.TOKEN_SECRET,
	},
	node_env : envs.parsed.NODE_ENV.toLowerCase(),
	db : envs.parsed.DATABASEURL,
};