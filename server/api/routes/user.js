const token = require('../middlewares/token.service.js')
const valid_user = require('../middlewares/user.js')
const user_shared = require('../logic/user/api.user.shared.js')
const api_user_details = require('../logic/user/user.details.js')
const api_user_create = require('../logic/user/api.user.create.js')
const api_user_verify = require('../logic/user/user.verify.js')
const api_user_login = require('../logic/user/api.user.login.js')
const api_user_update = require('../logic/user/api.user.update.js')
const api_user_remove = require('../logic/user/api.user.remove.js')
const exit = require('../middlewares/exit.js')


// todo make sure owner is valid & exists ...

module.exports = function (app) {

	app.get('/api/user', token.required, function (req, res) {

		api_user_details(req.body.token, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			newUser = user_shared.safe_export(newUser)

			return exit(res,
				200,
				'Success User found.',
				{ account: newUser }
			)
		})
	})

	app.post('/api/user', valid_user.create, function (req, res) {

		api_user_create(req.body.user, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			// now send email
			const email_data = {
				from: 'Kubedev <hi@kubedev.co.uk>',
				to: newUser.email,
				subject: 'Welcome',
				text: 'Here is your new account, to get started visit : http://isitup.kubedev.co.uk/user/verify/' + newUser.meta.magic_link
			};

			app.emit('EMAIL_SEND', email_data)

			newUser = user_shared.safe_export(newUser)

			let newToken = token.create(newUser)

			return exit(res,
				200,
				'Success User created.',
				{ account: newUser, token: newToken }
			)
		})
	})

	app.post('/api/user/login', valid_user.login, function (req, res) {

		api_user_login(req.body.user, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			newUser = user_shared.safe_export(newUser)

			let newToken = token.create(newUser)

			return exit(res,
				200,
				'Success User login.',
				{ account: newUser, token: newToken }
			)
		})
	})

	app.post('/api/user/logout', token.logout, function (req, res) {

		token.add_token_to_blackList(req, function (error, result) {

			if (error) {
				return exit(res, 400, error.message || error, error)
			}

			return exit(res,
				201,
				result,
				result
			)
		})
	})

	app.patch('/api/user', token.required, valid_user.update, function (req, res) {

		api_user_update({ user: req.body.user, auth: req.body.token }, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			newUser = user_shared.safe_export(newUser)

			let newToken = token.create(newUser)

			return exit(res,
				201,
				'Success User updated.',
				{ account: newUser, token: newToken }
			)
		})
	})

	app.delete('/api/user', token.required, function (req, res) {

		api_user_remove(req.body.token, function (error, newUser) {

			if (error) {
				return exit(res, 422, error.message || error, error)
			}

			newUser = user_shared.safe_export(newUser)

			// todo remove all jobs & pings

			return exit(res,
				201,
				'Success User removed.',
				{ account: newUser, token: null }
			)
		})
	})



	app.get('/api/user/verify/:verify', valid_user.verify, function (req, res) {

		api_user_verify(req.body.user, function (error, newUser) {

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







