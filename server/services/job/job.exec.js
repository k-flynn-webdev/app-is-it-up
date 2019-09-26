// does the work of a job
const request = require('request');

function check_exists(input){
	if(input === null) return false;
	if(input === undefined) return false;
	if( input.toString().length < 1){
		return false;
	}
	return true;
}

function exec(job, next){

	if(!check_exists(job)) return next(false);
	if(!check_exists(job.url)) return next(false);
	if(!check_exists(job.owner)) return next(false);
	if(!check_exists(job.time)) return next(false);
	if(!check_exists(job.id)) return next(false);

	request( { url : job.url, method : job.method, json: true }, function(err,res){

		if(err){
			// todo error response
			return next(false);
		}

		return next(true);


		// todo should be saving out direct to array & db instead of returning?
	});
}
module.exports = exec;