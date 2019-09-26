const sanitizer = require('sanitizer');


function check_exists(input){
	if(input === null) return false;
	if(input === undefined) return false;
	if( input.toString().length < 1){
		return false;
	}
	return true;
}


function valid_url(input){
	return input;
}
function valid_method(input){
	// || 'GET'
	return input;
}
function valid_props(input){
	return input;
}
function valid_owner(input){
	return input;
}
function valid_time(input){
	return input;
}
// todo all valid types ..
exports.valid = {
	check : check_exists,
	url : valid_url,
	method : valid_method,
	props : valid_props,
	owner : valid_owner,
	time : valid_time,
};


function middle(req, res, next){

	function exit(status,message,data){
		return res.status(status).json({
			status : status,
			message : message,
			data : data,
		});
	}

	if(!check_exists(req.body.url)) return exit(422,'missing property.');
	if(!check_exists(req.body.owner)) return exit(422,'missing property.');
	if(!check_exists(req.body.time)) return exit(422,'missing property.');

	req.body.job = {};

	req.body.job.url = valid_url(sanitizer.sanitize(req.body.url));
	req.body.job.method = valid_method(sanitizer.sanitize(req.body.method));
	req.body.job.props = valid_props(sanitizer.sanitize(req.body.props));
	req.body.job.owner = valid_owner(sanitizer.sanitize(req.body.owner));
	req.body.job.time = valid_time(sanitizer.sanitize(req.body.time));

	next();
}
exports.middle = middle;






