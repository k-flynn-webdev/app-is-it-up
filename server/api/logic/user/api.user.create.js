const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const m_user = require('../../../models/user.js')
const valid = require('../../middlewares/user.js').valid
const config = require('../../../config/config.js')
const logger = require('../../../helpers/logger.js')

function create (user, next) {
	if (!valid.name(user.name)) return next(new Error('Invalid Name.'))
	if (!valid.email(user.email)) return next(new Error('Invalid Email.'))

	let passwordTest = valid.password(user.password)
	if (passwordTest !== true) return next(new Error(passwordTest))

	m_user.find({ email: user.email })
		.then(items => {

			if (items.length > 0) {
				throw new Error('Email already in use.')
			}

			let user_model = new m_user()

			user_model.name = user.name
			user_model.email = user.email

			let magicObject = {
				name: user_model.name,
				time: Date.now(),
				id: user_model._id
			}
			let magicLink = jwt.sign(magicObject, 'magic-links-token').toString().slice(5,-5)

			user_model.meta.magic_link = magicLink

			return createPassword(user, user_model)
		})
		.then(user_model => {
			return user_model.save()
		})
		.then(result => {
			return next(null, result)
		})
		.catch(err => {
			logger.log(err)
			return next(err)
		})
}

module.exports = create

function createPassword (input, user_model) {
	if (input.password) {
		return bcrypt.genSalt(config.SALT_ROUNDS)
			.then(salt => {
				return bcrypt.hash(config.HASH_SECRET + input.password, salt)
			})
			.then(hash => {
				user_model.password = hash
				return Promise.resolve(user_model)
			})
	} else {
		return Promise.resolve(user_model)
	}
}




