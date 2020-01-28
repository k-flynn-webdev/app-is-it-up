const exit = require('../../services/exit.js')
const logger = require('../../helpers/logger.js')
const m_user = require('../../models/user.js')
const userMiddle = require('../middlewares/user.js')
const token = require('../../services/token.service.js')

// const user_shared = require('../logic/user/api.user.shared.js')
// const api_user_details = require('../logic/user/user.details.js')
// const api_user_create = require('../logic/user/api.user.create.js')
// const api_user_verify = require('../logic/user/user.verify.js')
// const api_user_reset = require('../logic/user/user.reset.js')
// const api_user_login = require('../logic/user/api.user.login.js')
// const api_user_update = require('../logic/user/api.user.update.js')
// const api_user_remove = require('../logic/user/api.user.remove.js')

// todo make sure owner is valid & exists ...

// TODO
// add user verify & login events
// on user create, trigger a user creation event for other things to tap into
// on user update, trigger an update event for things to check/react to
// on user deletion trigger a user removal/cleanup event

// move all validation into the user model
// shared sanitize of all vars in params & body
// so all the error checking happens when a model is saved so it's not duplicated
// all requests are shallow checked for params & body.vars instead

module.exports = function (app) {

	app.get('/api/user', token.required, function (req, res) {

		m_user.findOne({ _id: req.body.token.id })
			.then(result => {

				if (!result || result.length === 0) {
					throw new Error('User does not exist, please contact support.')
				}

				return exit(res,
					200,
					'Success User found.',
					{ account: result.safeExport(true) })
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 422, message, err)
			})
	})

	app.post('/api/user', userMiddle.create, function (req, res) {

		m_user.find({ email: req.body.email })
			.then(items => {

				if (items.length > 0) {
					throw new Error('Email already in use.')
				}

				return m_user.createPassword(req.body.password)
			})
			.then(userPassword => {
				let newUser = new m_user({
					name: req.body.name,
					email: req.body.email,
					password: userPassword
				})

				newUser.meta.link_verify = token.magic(newUser)

				return newUser.save()
			})
			.then(userModel => {

				app.emit('ACCOUNT_CREATE', userModel)

				return exit(res,
					200,
					'Success User created.',
					{
						account: userModel.safeExport(),
						token: token.create(userModel.safeExport())
					})
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 422, message, err)
			})
	})

	app.post('/api/user/login', userMiddle.login, userMiddle.prepare, function (req, res) {

		m_user.findOne({ email: req.body.email })
			.then(userFound => {

				if (!userFound || userFound.length === 0) {
					throw new Error('User does not exist, please contact support.')
				}

				return userFound.comparePassword(req.body.password)
			})
			.then(userResult => {
				userResult.meta.login = Date.now()

				return userResult.save()
			})
			.then(userResult => {

				app.emit('ACCOUNT_LOGIN', userResult)

				return exit(res,
					200,
					'Success User login.',
					{
						account: userResult.safeExport(),
						token: token.create(userResult.safeExport())
					})
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 422, message, err)
			})
	})

	app.post('/api/user/logout', token.logout, function (req, res) {

		token.add_token_to_blackList(req)
			.then(result => {

				return exit(res, 201, result, result)
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 400, message, err)
			})
	})

	app.patch('/api/user', token.required, userMiddle.update, function (req, res) {

		// api_user_update({ user: req.body.user, auth: req.body.token }, function (error, newUser) {
		//
		// 	if (error) {
		// 		return exit(res, 422, error.message || error, error)
		// 	}
		//
		// 	if (req.body.user.email && !newUser.meta.verify) {
		// 		app.emit('EMAIL_VERIFY', newUser.email, newUser.meta.magic_link)
		// 	}
		//
		// 	return exit(res,
		// 		201,
		// 		'Success User updated.',
		// 		{
		// 			account: user_shared.safe_export(newUser),
		// 			token: token.create(user_shared.safe_export(newUser))
		// 		})
		// })
	})

	app.delete('/api/user', token.required, function (req, res) {

		// api_user_remove(req.body.token, function (error, newUser) {
		//
		// 	if (error) {
		// 		return exit(res, 422, error.message || error, error)
		// 	}
		//
		// 	// todo remove all jobs & pings
		//
		// 	return exit(res,
		// 		201,
		// 		'Success User removed.',
		// 		{
		// 			account: user_shared.safe_export(newUser),
		// 			token: null
		// 		})
		// })
	})

	/**
	 * Verify a users account, one time process to ensure email
	 */
	app.get('/api/user/verify/:verify', userMiddle.verify, userMiddle.prepare, function (req, res) {

		m_user.findOne({ 'meta.link_verify': req.params.verify })
			.then(result => {

				if (!result) {
					throw new Error('Verify link does not exist, please contact support.')
				}

				if (result.meta.link_verify !== req.params.verify) {
					throw new Error('Verify link does not match, please contact support.')
				}

				app.emit('ACCOUNT_VERIFIED', result)

				result.meta.link_verify = ''
				return result.save()
			})
			.then(result => {
				return exit(res,
					200,
					'Success User verified.',
					{
						account: result.safeExport(),
						token: token.create(result.safeExport())
					})
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 400, message, err)
			})
	})

	/**
	 * Triggers reset user password process via email, will invalidate a account until the next stage is complete..
	 */
	app.post('/api/user/reset/', userMiddle.hasEmail, function (req, res) {

		api_user_reset.resetStart(req.body.user, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			app.emit('EMAIL_RESET', newUser.email, newUser.meta.magic_link)

			return exit(res,
				200,
				'Success a reset email has been sent.')
		})
	})

	/**
	 * User reset password with the above token
	 */
	app.patch('/api/user/reset/:verify', userMiddle.verify, function (req, res) {

		api_user_reset.resetComplete(req.body, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			newUser = user_shared.safe_export(newUser)

			let newToken = token.create(newUser)

			return exit(res,
				200,
				'Success User verified.',
				{ account: newUser, token: newToken }
			)
		})
	})

	return app
}







