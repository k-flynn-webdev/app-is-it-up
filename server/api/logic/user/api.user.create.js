const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const m_user = require('../../../models/user.js')
const valid = require('../../middlewares/user.js').valid
const config = require('../../../config/config.js')
const logger = require('../../../helpers/logger.js')
const token = require('../../middlewares/token.service.js')

let magicLinkSetup = [10,75]

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

			user_model.meta.verified = false
			user_model.meta.magic_link = token.magic(user_model)

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




