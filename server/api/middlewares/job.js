
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


function middle(input, next){

	if(!check_exists(input)) return next(false);
	if(!check_exists(input.url)) return next(false);
	if(!check_exists(input.owner)) return next(false);
	if(!check_exists(input.time)) return next(false);

	input.url = valid_url(sanitizer.sanitize(input.url));
	input.method = valid_method(sanitizer.sanitize(input.method));
	input.props = valid_props(sanitizer.sanitize(input.props));
	input.owner = valid_owner(sanitizer.sanitize(input.owner));
	input.time = valid_time(sanitizer.sanitize(input.time));

	return next(null, input);
}
exports.middle = middle;






