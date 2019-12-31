const bcrypt = require('bcrypt')
const m_user = require('../../../models/user.js')
const valid = require('../../middlewares/user.js').valid
const shared = require('./api.user.shared.js')
const config = require('../../../config/config.js')
const logger = require('../../../helpers/logger.js')


function login (input, next) {
	if (!valid.email(input.email)) return next(new Error('Invalid Email.'))
	let passwordTest = valid.password(input.password)
	if (passwordTest !== true) return next(new Error(passwordTest))

	let user_model = null

	m_user.findOne({ email: input.email })
		.then(user_found => {

			if (!user_found || user_found.length < 1) {
				throw new Error('No account found with that Email.')
			}

			if (!shared.exists(user_found)) {
				throw new Error('Account missing.')
			}

			user_model = user_found

			return bcrypt.compare(config.HASH_SECRET + input.password, user_model.password)
		})
		.then(passwordTest => {
			if (!passwordTest) {
				logger.log('User invalid login attempt: ' + user_model._id)
				throw new Error('Incorrect password.')
			}

			user_model.meta.login = Date.now()

			return user_model.save()
		})
		.then(result => {
			logger.log('User has logged in: ' + result._id)
			return next(null, user_model)
		})
		.catch(err => {
			logger.log(err)
			return next(err)
		})
}

module.exports = login



