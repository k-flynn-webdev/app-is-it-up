


function valid_url(input){
	let temp = input.toLowerCase();

	if(temp.indexOf('http') === -1){
		temp = 'http://' + temp;
	}

	if(temp.indexOf('localhost') !== -1) return temp;

	let point = temp.indexOf('.');

	if(point === -1) return false;
	if(point >= temp.length - 2 ) return false;

	// todo look into this??
	// let tmpsplit = temp.split('.');
	// let delim = tmpsplit[1].replace(/[0-9]/g, '');
	// console.log(delim);
	// this would fail on ip address as url ..

	return temp;
}
function valid_method(input){
	let temp = input.toLowerCase();
	if(temp.indexOf('post') !== -1) return 'POST';
	if(temp.indexOf('put') !== -1) return 'PUT';
	if(temp.indexOf('delete') !== -1) return 'DELETE';
	return 'GET';
}
function valid_props(input){
	if(input === undefined || input === null || input === '') return ' ';
	return input.toLowerCase();
}
function valid_owner(input){
	let valid_owner = '5d8cc974f14001679cb90caf';
	if(input.length !== valid_owner.length) return false;
	return input.toLowerCase();
}
function valid_time(input){
	return is_number(input);
}
function valid_id(input){
	return is_number(input);
}
function valid_status(input){
	let temp = input.toLowerCase();
	let hasTrue = temp.indexOf('true');
	let hasFalse = temp.indexOf('false');
	if(hasTrue !== -1 || hasFalse !== -1) return true;
	return false;
	// todo dont like this??
}

function is_number(input){
	if(input === undefined || 
	input === null || 
	input === '') return false;
	let temp = Number(input);
	if(temp.toString() === 'NaN') return false;
	if(!Number.isInteger(temp)) return false;
	return temp;
}


// todo all valid types ..
exports.valid = {
	url : valid_url,
	method : valid_method,
	props : valid_props,
	time : valid_time,
	owner : valid_owner,
	id : valid_id,
	status : valid_status,
};


let seconds_in_month = 60 * 60 * 24 * 30;

function meta(input){
	if(input.time === undefined || input.time === null) return false;
	let tmp = {
		max : Math.floor(seconds_in_month / Math.floor(input.time)),
		num : 0,
		next : Date.now(),
	}
	return tmp;
}
exports.meta = meta;


function exists(input){
	if(input === null || input === undefined) return false;
	if(input.toString().length < 1) return false;
	return true;
}

function update(model,input){

	if(exists(input.url)){
		model.url = valid_url(input.url);
	}
	if(exists(input.method)){
		model.method = valid_method(input.method);
	}
	if(exists(input.props)){
		model.props = valid_props(input.props);
	}
	if(exists(input.time)){
		model.time = valid_time(input.time);
		model.meta = meta(input);
	}
	if(exists(input.job_id)){
		model.job_id = input.job_id;
	}
	if(exists(input.owner)){
		model.owner = valid_owner(input.owner);
	}

	return model;
}
exports.update = update;




