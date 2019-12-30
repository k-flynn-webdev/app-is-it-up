const bcrypt = require('bcrypt')
const m_user = require('../../../models/user.js')
const valid = require('../../middlewares/user.js').valid
const shared = require('./api.user.shared.js')
const config = require('../../../config/config.js')

function login (input, next) {
  if (!valid.email(input.email)) return next(new Error('Invalid Email.'))
  let passwordTest = valid.password(input.password)
  if (passwordTest !== true) return next(new Error(passwordTest))

  m_user.find({ email: input.email })
    .then(items => {
      // todo make a log of the login

      if (items.length < 1) {
        throw new Error('No account found with that Email.')
      }

      return items[0]
    })
    .then(item => {
      if (!shared.exists(item)) {
        throw new Error('Account missing.')
      }

      bcrypt.compare(config.HASH_SECRET + input.password, item.password)
        .then(result => next(null, item))
    })
    .catch(err => {
      // todo make a note of error in log
      return next(err)
    })
}
exports.login = login





