const m_user = require('../../../models/user.js');

const valid = require('./api.user.shared.js').valid;
const shared = require('./api.user.shared.js');


function create(input, next){

	create_model(input, function(error, user_model){

		if(error){
			return next(error);
		}

		// does it exist?
		shared.find(user_model,function(error, found){

			if(error){
				return next(error);
			}

			if(found.length !== 0){
				return next(new Error('Already exists.'));
			}

			user_model.save(function(error,result){

				if(error){
					return next(error);
				}

				return next(null,user_model);
			});
		});
	});
}
exports.create = create;


function create_model(input, next){

	if(!valid.name(input.name)) return next(new Error('Invalid Name.'));
	if(!valid.Email(input.Email)) return next(new Error('Invalid Email.'));
	if(!valid.Password(input.Password)) return next(new Error('Invalid Password.'));

	let tmp = new m_user();

	let clean = shared.update(tmp,input);
	clean.user_id = create_id(clean);

	return next(null,clean);
}
exports.create_model = create_model;

// function create_id(input) {
// 	let temp = input.url + input.method + input.props + input.time + input.owner;

// 	let hash = 0, i, chr;
// 	if (temp.length === 0) return hash;
// 	for (i = 0; i < temp.length; i++) {
// 		chr = temp.charCodeAt(i);
// 		hash = ((hash << 5) - hash) + chr;
// 		hash |= 0; // Convert to 32bit integer
// 	}

// 	return hash;
// };





