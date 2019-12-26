const bcrypt = require('bcrypt');
const m_user = require('../../../models/user.js');
const valid = require('../../middlewares/user.js').valid;
const shared = require('./api.user.shared.js');
const config = require('../../../config/config.js');


function create(input, next){
	if(!valid.name(input.name)) return next(new Error('Invalid Name.'));
	if(!valid.email(input.email)) return next(new Error('Invalid Email.'));
	
	let passwordTest = valid.password(input.password)
	if(passwordTest !== true) return next(new Error(passwordTest));

	m_user.find({ email: input.email })
		.then(items => {

			if (items.length > 1) {
				throw new Error('Email already in use.')
			}

			return bcrypt.genSalt(config.SALT_ROUNDS)
		})
		.then(salt => {
			bcrypt.hash(config.HASH_SECRET + input.password, salt)
				.then(hash => {

					// todo make a log of the creation

					input.password = hash
					let tmp = new m_user()
					let newUser = shared.update(tmp, input)
					newUser.save()
						.then(user => {
							return next(null, user)
						})
				})
		})
		.catch(err => {
			// todo make a note of error in log
			return next(err)
		})
}
exports.create = create;





