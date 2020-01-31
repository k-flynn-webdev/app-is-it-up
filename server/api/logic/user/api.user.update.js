// const bcrypt = require('bcrypt')
// const m_user = require('../../../models/user.js')
// const valid = require('../../middlewares/user.js').valid
// const config = require('../../../config/config.js')
// const logger = require('../../../helpers/logger.js')
// const token = require('../../middlewares/token.service.js')
//
//
// function update ({ user, auth }, next) {
// 	if (user.name && !valid.name(user.name)) return next(new Error('Invalid Name.'))
// 	if (user.email && !valid.email(user.email)) return next(new Error('Invalid Email.'))
//
// 	if (user.password) {
// 		let passwordTest = valid.password(user.password)
// 		if (passwordTest !== true) return next(new Error(passwordTest))
// 	}
//
// 	m_user.findOne({ _id: auth.id })
// 		.then(user_model => {
//
// 			if (!user_model.meta.verified) {
// 				throw new Error('Email address is not verified, please verify first.')
// 			}
//
// 			if (user.email && auth.email !== user.email) {
// 				m_user.find({ email: user.email })
// 					.then(emailFound => {
// 						if (emailFound.length > 0) {
// 							throw new Error('Email address is already in use.')
// 						}
// 					})
// 					.catch(err => {
// 						return next(err)
// 					})
// 			}
//
// 			if (!user_model) {
// 				throw new Error('No user with that id found.')
// 			}
//
// 			if (user.name) {
// 				user_model.name = user.name
// 			}
//
// 			if (user.email) {
// 				user_model.email = user.email
// 				// todo trigger verify email process
// 				user_model.meta.verified = false
// 				user_model.meta.magic_link = token.magic(user_model)
// 			}
//
//
// 			return updatePassword(user, user_model)
// 		})
// 		.then(user_model => {
// 			return user_model.save()
// 		})
// 		.then(result => {
// 			return next(null, result)
// 		})
// 		.catch(err => {
// 			logger.log(err)
// 			return next(err)
// 		})
// }
//
// module.exports = update
//
// function updatePassword (input, user_model) {
// 	if (input.password) {
// 		return bcrypt.genSalt(config.SALT_ROUNDS)
// 			.then(salt => {
// 				return bcrypt.hash(config.HASH_SECRET + input.password, salt)
// 			})
// 			.then(hash => {
// 				user_model.password = hash
// 				return Promise.resolve(user_model)
// 			})
// 	} else {
// 		return Promise.resolve(user_model)
// 	}
// }
//
//
