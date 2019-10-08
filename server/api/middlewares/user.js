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



function login(req,res,next){

	if(!exists(req.body.email)) return exit(res,422,'Missing email property.');
	if(!exists(req.body.password)) return exit(res,422,'Missing password property.');

	prepare(req);
	next();
}
exports.login = login;

function create(req,res,next){

	if(!exists(req.body.name)) return exit(res,422,'Missing name property.');
	if(!exists(req.body.email)) return exit(res,422,'Missing email property.');
	if(!exists(req.body.password)) return exit(res,422,'Missing password property.');

	prepare(req);
	next();
}
exports.create = create;

function update(req, res, next){

	// todo user token in header only ..
	// if(!exists(req.params)) return exit(res,422,'Missing user id.');
	// if(!exists(req.params.user)) return exit(res,422,'Missing user id.');
	// if(!exists(req.body.owner)) return exit(res,422,'Missing owner property.');

	prepare(req);
	next();
}
exports.update = update;


function prepare(input){

	if(input.body.user === undefined || input.body.user === null){
		input.body.user = {};
	}

	if(exists(input.body.name)){
		input.body.user.name = sanitizer(input.body.name);
	}
	if(exists(input.body.email)){
		input.body.user.email = sanitizer(input.body.email);
	}
	if(exists(input.body.password)){
		input.body.user.password = sanitizer(input.body.password);
	}
	
}


