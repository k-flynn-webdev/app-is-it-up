const bcrypt = require('bcrypt')
const m_user = require('../../../models/user.js')
const valid = require('../../middlewares/user.js').valid
const shared = require('./api.user.shared.js')
const config = require('../../../config/config.js')


function updatePassword(user) {
	bcrypt.genSalt(config.SALT_ROUNDS)
		.then(salt => {
			bcrypt.hash(config.HASH_SECRET + user.password, salt)
				.then(hash => {
					user_model.password = hash
					console.log('new password updated')
				})
		})
}

function update ({ user, auth }, next) {
	if (user.name && !valid.name(user.name)) return next(new Error('Invalid Name.'))
	if (user.email && !valid.email(user.email)) return next(new Error('Invalid Email.'))

	if (user.password) {
		let passwordTest = valid.password(user.password)
		if (passwordTest !== true) return next(new Error(passwordTest))
	}

	console.log(user)
	console.log(auth)

	m_user.findOne({_id: auth.id})
		.then(user_model => {

			if (!user_model) {
				throw new Error('No user with that id found.')
			}

			if (user.name) {
				user_model.name = user.name
				console.log('new name updated')
			}

			if (user.email) {
				user_model.email = user.email
				console.log('new email updated')
			}

			if (user.password) {
				bcrypt.genSalt(config.SALT_ROUNDS)
					.then(salt => {
						bcrypt.hash(config.HASH_SECRET + user.password, salt)
							.then(hash => {
								user_model.password = hash
								console.log('new password updated')
								return user_model.save()
									.then(result => {
										console.log('model done updating & saving.')
										return next(null, result)
									})
							})
					})
			} else {
				return user_model.save()
					.then(result => {
						console.log('model done updating & saving.')
						return next(null, result)
					})
			}
		})
		.catch(err => {
			throw err
			return next(err)
		})
}

exports.update = update




