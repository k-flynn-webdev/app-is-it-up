const path = require('path');
const cors = require('cors');
const filter = require('content-filter'); 
const rate_limit = require("express-rate-limit");
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');

const EventEmitter = require('events').EventEmitter; 
var myEmitter = new EventEmitter;

const config = require( path.join(__dirname, '..', 'config', 'config.js' ));


module.exports = function( app ){

	return new Promise( function(resolve, reject){

		// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
		// It shows the real origin IP in the heroku or Cloudwatch logs
		app.enable('trust proxy');

		// The magic package that prevents frontend developers going nuts
		// Alternate description:
		// Enable Cross Origin Resource Sharing to all origins by default
		app.use(cors());

		app.use(filter()); // prevent db attacks in urls 

		app.use(rate_limit({ 
			windowMs: config.rate.time, 
			max: config.rate.max, 
			message: { 
				status: 429, 
				message: "Too many requests." 
		}}));

		// Some sauce that always add since 2014
		// "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
		// Maybe not needed anymore ?
		app.use(require('method-override')('_method'));

		// Middleware that transforms the raw string of req.body into json
		app.use(body_parser.json());
		app.use(body_parser.urlencoded({ extended: true }));
		app.use(cookie_parser());

		// Set default json response header ..
		app.set('json spaces', 4);

		return resolve('	✅ Express setup.');

	});

}


