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
	let temp = input.toLowerCase();

	if(temp.indexOf('localhost') !== -1) return temp;

	let point = temp.indexOf('.');

	if(point === -1) return false;
	if(point >= temp.length - 2 ) return false;

	return temp;
}
function valid_method(input){
	if(!check_exists(input)) return 'GET';
	let temp = input.toLowerCase();
	if(temp === 'get') return 'GET';
	if(temp === 'post') return 'POST';
	if(temp === 'put') return 'PUT';
	if(temp === 'delete') return 'DELETE';
}
function valid_props(input){
	if(!check_exists(input)) return '';
	return input;
}
function valid_owner(input){
	let valid_owner = '5d8cc974f14001679cb90caf';
	if(input.length !== valid_owner.length) return false;
	return input;
}
function valid_time(input){
	// every x hour or mins .. for now just every 30 mins
	return 0.5;
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

	if(!check_exists(req.body.url)) return exit(422,'missing url property.');
	if(!check_exists(req.body.owner)) return exit(422,'missing owner property.');
	if(!check_exists(req.body.time)) return exit(422,'missing time property.');

	req.body.job = {};

	req.body.job.url = sanitizer.sanitize(req.body.urlinput.toLowercase());
	req.body.job.method = sanitizer.sanitize(req.body.methodinput.toLowercase());
	req.body.job.props = sanitizer.sanitize(req.body.propsinput.toLowercase());
	req.body.job.owner = sanitizer.sanitize(req.body.ownerinput.toLowercase());
	req.body.job.time = sanitizer.sanitize(req.body.timeinput.toLowercase());

	next();
}
exports.middle = middle;






