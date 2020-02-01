const m_user = require('../../models/user.js')
const exit = require('../../services/exit.js')
const logger = require('../../helpers/logger.js')
const userMiddle = require('../middlewares/user.js')
const token = require('../../services/token.service.js')

// TODO
// add user verify & login events
// on user create, trigger a user creation event for other things to tap into
// on user update, trigger an update event for things to check/react to
// on user deletion trigger a user removal/cleanup event

module.exports = function (app) {

	app.get('/api/user', token.required, function (req, res) {

		m_user.findOne({ _id: req.body.token.id })
			.then(result => {

				if (!result || result.length === 0) {
					throw new Error('User does not exist, please contact support.')
				}

				return exit(res, 200, 'Success User found.', {
					account: result.safeExport(true)
				})
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

				return exit(res, 200, 'Success User created.', {
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

				return exit(res, 200, 'Success User login.', {
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

				app.emit('ACCOUNT_LOGOUT', result)

				return exit(res, 201, result, result)
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 400, message, err)
			})
	})

	app.patch('/api/user', token.required, userMiddle.update, userMiddle.prepare, function (req, res) {

		m_user.findOne({ _id: req.body.token.id })

			.then(userFound => {

				if (!userFound || userFound.length === 0) {
					throw new Error('User does not exist, please contact support.')
				}

				if (userFound.meta.link_verify.length > 0) {
					throw new Error('User is not yet verified.')
				}

				return req.body.password ?
					m_user.createPassword(req.body.password, userFound) :
					Promise.resolve([null, userFound])
			})
			.then(([hash, userFound]) => {

				if (req.body.name) {
					userFound.name = req.body.name
				}
				if (req.body.email) {
					userFound.email = req.body.email
				}

				if (req.body.password && hash) {
					userFound.password = hash
				}

				if (req.body.password || req.body.email) {
					userFound.meta.link_verify = token.magic(userFound)
					userFound.meta.link_recover = 'VERIFY PROCESS'
					app.emit('ACCOUNT_VERIFY', userFound)
				}

				return userFound.save()
			})
			.then(result => {
				app.emit('ACCOUNT_UPDATED', result)

				return exit(res, 200, 'Success User updated.', {
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
	 * Delete a user account
	 */
	app.delete('/api/user', token.required, function (req, res) {

		m_user.findOne({ _id: req.body.token.id })
			.then(userFound => {

				if (!userFound || userFound.length === 0) {
					throw new Error('User does not exist, please contact support.')
				}

				return m_user.deleteOne({ _id: req.body.token.id })
			})
			.then(result => {

				app.emit('ACCOUNT_REMOVED', result)

				return exit(res, 201, 'Success User removed.',
					{ account: null, token: null })
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 400, message, err)
			})
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

				result.meta.link_verify = ''
				return result.save()
			})
			.then(result => {

				app.emit('ACCOUNT_VERIFIED', result) // todo

				return exit(res, 200, 'Success User verified.',
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
	app.post('/api/user/reset/', userMiddle.hasEmail, userMiddle.prepare, function (req, res) {

		m_user.findOne({ email: req.body.email })
			.then(result => {

				if (!result) {
					throw new Error('No account with that email found.')
				}

				if (result.email.toString() !== req.body.email.toString()) {
					throw new Error('An error has occurred with that email.')
				}

				result.meta.link_verify = 'RESET PROCESS'
				result.meta.link_recover = token.magic(result)

				return result.save()
			})
			.then(result => {

				app.emit('ACCOUNT_RESET', result)

				return exit(res,
					200,
					'Success a reset email has been sent.')
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 400, message, err)
			})
	})

	/**
	 * User reset password with the above token
	 */
	app.patch('/api/user/reset/:recover', userMiddle.recover, userMiddle.hasPassword, userMiddle.prepare, function (req, res) {

		m_user.findOne({ 'meta.link_recover': req.params.recover })
			.then(result => {

				if (!result) {
					throw new Error('No account with that link found.')
				}

				if (result.meta.link_recover.toString() !== req.params.recover.toString()) {
					throw new Error('An error has occurred with that link.')
				}

				return m_user.createPassword(req.body.password, result)
			})
			.then(([hash, result]) => {

				result.password = hash
				result.meta.link_verify = ''
				result.meta.link_recover = ''

				return result.save()
			})
			.then(result => {

				app.emit('ACCOUNT_VERIFIED', result) // todo

				return exit(res,
					200,
					'Success a new password has been set.')
			})
			.catch(err => {
				let message = err.message || err
				logger.log(message)

				return exit(res, 400, message, err)
			})
	})

	return app
}







