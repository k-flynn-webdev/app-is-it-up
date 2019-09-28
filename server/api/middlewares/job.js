const sanitizer = require('sanitizer');


function check_exists(input){
	if(input === null) return false;
	if(input === undefined) return false;
	if( input.toString().length < 1){
		return false;
	}
	return true;
}


function create_hash(job) {
	let temp = job.url + job.method + job.props + job.time + job.owner;

	let hash = 0, i, chr;
	if (temp.length === 0) return hash;
	for (i = 0; i < temp.length; i++) {
		chr = temp.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}

	return hash;
};


function valid_url(input){
	let temp = input.toLowerCase();

	if(temp.indexOf('http') === -1){
		temp = 'http://' + temp;
	}

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
	return input.toLowerCase();
}
function valid_owner(input){
	let valid_owner = '5d8cc974f14001679cb90caf';
	if(input.length !== valid_owner.length) return false;
	return input.toLowerCase();
}
function valid_time(input){
	// every x hour or mins .. for now just every 30 mins
	return 0.5;
}
function valid_id(input){
	if(Number.isInteger(input)) return false;
	return input;
}


// todo all valid types ..
exports.valid = {
	check : check_exists,
	hash : create_hash,
	url : valid_url,
	method : valid_method,
	props : valid_props,
	owner : valid_owner,
	time : valid_time,
	id : valid_id,
};

function exit(res,status,message,data){
	return res.status(status).json({
		status : status,
		message : message,
		data : data,
	});
}

function get(req,res,next){

	if(!check_exists(req.params.job)) return exit(res,422,'missing job id.');
	if(!valid_id(req.params.job)) return exit(res,422,'invalid job id.');
	
	add_job(req);
	req.body.job.job_id = sanitizer.sanitize(req.params.job);
	next();
}
exports.get = get;


function create(req, res, next){

	if(!check_exists(req.body.url)) return exit(res,422,'missing url property.');
	if(!check_exists(req.body.owner)) return exit(res,422,'missing owner property.');
	if(!check_exists(req.body.time)) return exit(res,422,'missing time property.');

	add_job(req);
	validate(req);
	next();
}
exports.create = create;

function update(req, res, next){
	add_job(req);
	validate(req);
	next();
}
exports.update = update;


function add_job(input){
	if(input.body.job === undefined || input.body.job === null){
		input.body.job = {};
	}
}

function validate(input){

	if(check_exists(input.body.url)){
		input.body.job.url = sanitizer.sanitize(input.body.url);
	}
	if(check_exists(input.body.method)){
		input.body.job.method = sanitizer.sanitize(input.body.method);
	}
	if(check_exists(input.body.props)){
		input.body.job.props = sanitizer.sanitize(input.body.props);
	}
	if(check_exists(input.body.owner)){
		input.body.job.owner = sanitizer.sanitize(input.body.owner);
	}
	if(check_exists(input.body.time)){
		input.body.job.time = sanitizer.sanitize(input.body.time);
	}

}


