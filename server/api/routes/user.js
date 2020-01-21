const token = require('../middlewares/token.service.js')
const valid_user = require('../middlewares/user.js')
const user_shared = require('../logic/user/api.user.shared.js')
const api_user_details = require('../logic/user/user.details.js')
const api_user_create = require('../logic/user/api.user.create.js')
const api_user_verify = require('../logic/user/user.verify.js')
const api_user_reset = require('../logic/user/user.reset.js')
const api_user_login = require('../logic/user/api.user.login.js')
const api_user_update = require('../logic/user/api.user.update.js')
const api_user_remove = require('../logic/user/api.user.remove.js')
const exit = require('../middlewares/exit.js')

// todo make sure owner is valid & exists ...

// TODO
// on user create, trigger a user creation event for other things to tap into
// on user update, trigger an update event for things to check/react to
// on user deletion trigger a user removal/cleanup event
// breakdown: shared (findbyid, findbymagiclink, findbyemail)
// breakdown: shared (updatebyid)
// move all validation into the user model
// shared sanitize of all vars in params & body
// so all the error checking happens when a model is saved so it's not duplicated
// all requests are shallow checked for params & body.vars instead



module.exports = function (app) {

	app.get('/api/user', token.required, function (req, res) {

		api_user_details(req.body.token, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			return exit(res,
				200,
				'Success User found.',
				{ account: user_shared.safe_export(newUser) }
			)
		})
	})

	app.post('/api/user', valid_user.create, function (req, res) {

		api_user_create(req.body.user, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			app.emit('ACCOUNT_CREATE', newUser.email, newUser)

			return exit(res,
				200,
				'Success User created.',
				{
					account: user_shared.safe_export(newUser),
					token: token.create(user_shared.safe_export(newUser))
				})
		})
	})

	app.post('/api/user/login', valid_user.login, function (req, res) {

		api_user_login(req.body.user, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			return exit(res,
				200,
				'Success User login.',
				{
					account: user_shared.safe_export(newUser),
					token: token.create(user_shared.safe_export(newUser))
				})
		})
	})

	app.post('/api/user/logout', token.logout, function (req, res) {

		token.add_token_to_blackList(req, function (error, result) {

			if (error) {
				return exit(res, 400, error.message || error, error)
			}

			return exit(res, 201, result, result)
		})
	})

	app.patch('/api/user', token.required, valid_user.update, function (req, res) {

		api_user_update({ user: req.body.user, auth: req.body.token }, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			if (req.body.user.email && !newUser.meta.verify) {
				app.emit('EMAIL_VERIFY', newUser.email, newUser.meta.magic_link)
			}

			return exit(res,
				201,
				'Success User updated.',
				{
					account: user_shared.safe_export(newUser),
					token: token.create(user_shared.safe_export(newUser))
				})
		})
	})

	app.delete('/api/user', token.required, function (req, res) {

		api_user_remove(req.body.token, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			// todo remove all jobs & pings

			return exit(res,
				201,
				'Success User removed.',
				{
					account: user_shared.safe_export(newUser),
					token: null
				})
		})
	})

	/**
	 * Verify a users account, one time process to ensure email
	 */
	app.get('/api/user/verify/:verify', valid_user.verify, function (req, res) {

		api_user_verify(req.body.user, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			return exit(res,
				200,
				'Success User verified.',
				{
					account: user_shared.safe_export(newUser),
					token: token.create(user_shared.safe_export(newUser))
				})
		})
	})

	/**
	 * Triggers reset user password process via email, will invalidate a account until the next stage is complete..
	 */
	app.post('/api/user/reset/', valid_user.hasEmail, function (req, res) {

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
	app.patch('/api/user/reset/:verify', valid_user.verify, function (req, res) {

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







