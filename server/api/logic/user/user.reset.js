const jwt = require('jsonwebtoken')
const m_user = require('../../../models/user.js')
const logger = require('../../../helpers/logger.js')
const valid = require('../../middlewares/user.js').valid
const user_update = require('./api.user.update.js')
const token = require('../../middlewares/token.service.js')



function resetStart (user, next) {

	m_user.find({ email: user.email })
		.then(items => {

			let user_model = items[0]

			if (items.length === 0) {
				throw new Error('No account with that email exists.')
			}

			if (user_model.email.toString() !== user.email.toString()) {
				throw new Error('An error has occurred with that email.')
			}

			user_model.password = 'RESET PROCESS'
			user_model.meta.verified = false
			user_model.meta.magic_link = token.magic(user_model)

			return user_model.save()
		})
		.then(result => {
			logger.log(user.email + ' awaiting reset verification.')
			return next(null, result)
		})
		.catch(err => {
			logger.log(err, user)
			return next(err)
		})
}

exports.resetStart = resetStart

function resetComplete ({user, verify}, next) {

	let passwordTest = valid.password(user.password)
	if (passwordTest !== true) return next(new Error(passwordTest))

	let search = { 'meta.magic_link': user.verify.toString() }

	m_user.find(search)
		.then(items => {

			if (items.length === 0) {
				throw new Error('Verify link does not exist, please contact support.')
			}

			if (items[0].meta.magic_link.toString() !== user.verify.toString()) {
				throw new Error('Verify link does not match, please contact support.')
			}

			items[0].meta.verified = true
			items[0].meta.magic_link = ''

			return items[0].save()
		})
		.then(result => {

			let updateObj = {
				auth: {
					id: result._id
				},
				user: {
					password: user.password
				}
			}

			user_update(updateObj, function (error, result) {

				if (error) {
					throw error
				}

				logger.log(result.email + ' user reset password successfully.')

				return next(null, result)
			})
		})
		.catch(err => {
			logger.log(err)
			return next(err)
		})
}

exports.resetComplete = resetComplete


