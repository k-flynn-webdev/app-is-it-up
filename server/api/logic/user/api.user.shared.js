
const m_user = require('../../../models/user.js');


// todo need a create user token for header ..

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

	if(exists(input.token)){
		model.token = valid_token(input.token);
	}

	if(exists(input.name)){
		model.name = valid_name(input.name);
	}
	if(exists(input.email)){
		model.email = valid_email(input.email);
	}
	if(exists(input.password)){
		model.password = valid_password(input.password);
	}

	return model;
}
exports.update = update;




function search_term(input,next){
	let search = null;

	if(exists(input.owner) && input.owner.length > 1 ){
		search = { owner : input.owner };
	}
	if(exists(input.user_id) && input.user_id.length > 1 ){
		search = { user_id : input.user_id };
	}

	if(search === null){
		return next(new Error('Missing search term.'));
	}

	return next(null,search);
}


function find(user,next,override){

	if(override){
		return find_model(user,next);
	} 

	search_term(user,function(error,search){

		if(error){
			return next(error);
		}
		find_model(search,next);
	});
}
exports.find = find;

function find_model(input,next){
	m_user.find(input,function(error,found){
		if(error){
			return next(error);
		}

		console.log('searching');
		console.log(input);
		console.log(found);

		return next(null, Object.assign(input,{ found : found }));
	});			
}


function remove(user,next){

	search_term(user,function(error,search){

		if(error){
			return next(error);
		}

		m_user.deleteMany(search,function(error,result){

			if(error){
				return next(error);
			}

			search.result = result
		
			return next(null,search);

		});
	});
}
exports.remove = remove;



