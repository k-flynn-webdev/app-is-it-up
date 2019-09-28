const mongoose = require('mongoose');
const config = require('../config/config.js');

// Load models since we will not be instantiating our express server.
// require('../models/job.js');
// require('../models/ping.js');

beforeEach(function(done) {
	
	/*
	Define clearDB function that will loop through all 
	the collections in our mongoose connection and drop them.
	*/

	function clearDB() {
		for (var i in mongoose.connection.collections) {
			mongoose.connection.collections[i].deleteMany(function() {});
		}
		return done();
	}

	
// 	If the mongoose connection is closed, 
// 	start it up using the test url and database name
// 	provided by the node runtime ENV
	

	if (mongoose.connection.readyState === 0){ 
		mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.TEST_SUITE}`, 
		{ useNewUrlParser: true, useUnifiedTopology: true, },
		function(err) {
			if (err) {
				throw err;
			}
			return clearDB();
		});
	} else {
		return clearDB();
	}
});

afterEach(function(done) {
	mongoose.disconnect();
	return done();
});

afterAll(done => {
	return done();
});