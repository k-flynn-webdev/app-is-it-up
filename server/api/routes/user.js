const token = require('../middlewares/token.service.js')
const valid_user = require('../middlewares/user.js')
const user_shared = require('../logic/user/api.user.shared.js')
const api_user_create = require('../logic/user/api.user.create.js')
const api_user_login = require('../logic/user/api.user.login.js')
const api_user_update = require('../logic/user/api.user.update.js')
const api_user_remove = require('../logic/user/api.user.remove.js')
const exit = require('../middlewares/exit.js')


// todo make sure owner is valid & exists ...

module.exports = function (app) {

  // todo magic verify link

  app.post('/api/user', valid_user.create, function (req, res) {

    api_user_create(req.body.user, function (error, newUser) {

      if (error) {
        return exit(res, 422, error.message || error, error)
      }

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

  app.post('/api/user/logout', token.required, function (req, res) {

    token.add_token_to_blackList(req, function (error, result) {

      if (error) {
        return exit(res, 400, error.message || error, error)
      }

      return exit(res,
        201,
        'User logged out.'
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

  return app
}







