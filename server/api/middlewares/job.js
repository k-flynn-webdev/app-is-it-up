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
	// let time = 60 * 1;
	// every 30 mins do magic ..
	return Math.floor(input);
}
function valid_id(input){
	if(Number.isInteger(input)) return false;
	return input;
}



let seconds_in_month = 60 * 60 * 24 * 30;

function valid_meta(input){
	let tmp = {
		max : Math.floor(seconds_in_month / Math.floor(input.time)),
		num : 0,
		next : Date.now() + input.time,
	}


	// console.log('new Date()');
	// console.log(new Date());
	// console.log(Date.now());
	// console.log(new Date().getTime());
	// console.log( new Date(tmp.next).getTime() - input.time);


	// new Date()
	// 2019-09-30T00:28:49.321Z
	// 1569803329324
	// 1569803329325

	return tmp
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
	meta : valid_meta,
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

function owner(req,res,next){

	if(!check_exists(req.body.owner)) return exit(res,422,'missing owner property.');
	add_job(req);
	req.body.job.owner = sanitizer.sanitize(req.body.owner);
	next();
}
exports.owner = owner;


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


