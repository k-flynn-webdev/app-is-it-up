const sanitizer = require('sanitizer').sanitize;


function exists(input){
	if(input === null || input === undefined) return false;
	if(input.toString().length < 1) return false;
	return true;
}
exports.exists = exists;


function exit(res,status,message,data){

	let obj = {
		status : status,
		message : message,
		data : data,
	};

	if(process.env.NODE_ENV === 'test') return res(obj);

	return res.status(status).json(obj);
}



function get(req,res,next){

	if(!exists(req.params)) return exit(res,422,'Missing job id.');
	if(!exists(req.params.job)) return exit(res,422,'Missing job id.');

	prepare(req);
	next();
}
exports.get = get;

function create(req,res,next){

	if(!exists(req.body.url)) return exit(res,422,'Missing url property.');
	if(!exists(req.body.user)) return exit(res,422,'Missing user property.');
	if(!exists(req.body.time)) return exit(res,422,'Missing time property.');

	if(!exists(req.body.method)) req.body.method = 'GET';
	if(!exists(req.body.props)) req.body.props = '';

	prepare(req);
	next();
}
exports.create = create;

function update(req, res, next){

	if(!exists(req.params)) return exit(res,422,'Missing job id.');
	if(!exists(req.params.job)) return exit(res,422,'Missing job id.');
	if(!exists(req.body.user)) return exit(res,422,'Missing user property.');

	prepare(req);
	next();
}
exports.update = update;


function prepare(input){

	if(input.body.job === undefined || input.body.job === null){
		input.body.job = {};
	}

	if(exists(input.body.url)){
		input.body.job.url = sanitizer(input.body.url);
	}
	if(exists(input.body.method)){
		input.body.job.method = sanitizer(input.body.method);
	}
	if(exists(input.body.props)){
		input.body.job.props = sanitizer(input.body.props);
	}
	if(exists(input.body.time)){
		input.body.job.time = sanitizer(input.body.time);
	}
	if(exists(input.params) && exists(input.params.job)){
		input.body.job.job_id = sanitizer(input.params.job);
	}
	if(exists(input.body.user)){
		input.body.job.user = sanitizer(input.body.user);
	}	
}


