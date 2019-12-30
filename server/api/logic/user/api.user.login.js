const bcrypt = require('bcrypt')
const m_user = require('../../../models/user.js')
const valid = require('../../middlewares/user.js').valid
const shared = require('./api.user.shared.js')
const config = require('../../../config/config.js')

function login (input, next) {
	if (!valid.email(input.email)) return next(new Error('Invalid Email.'))
	let passwordTest = valid.password(input.password)
	if (passwordTest !== true) return next(new Error(passwordTest))

	m_user.findOne({ email: input.email })
		.then(user_model => {
			// todo make a log of the login

			if (!user_model || user_model.length < 1) {
				throw new Error('No account found with that Email.')
			}

			if (!shared.exists(user_model)) {
				throw new Error('Account missing.')
			}

			return bcrypt.compare(config.HASH_SECRET + input.password, user_model.password)
        .then(result => {
          if (!result) {
            throw new Error('Incorrect password.')
          }

          // todo unstagger these promises

          user_model.meta.login = Date.now()

          user_model.save()
            .then(result => {
              return next(null, user_model)
            })
        })
		})

		.catch(err => {
			// todo make a note of error in log
			return next(err)
		})
}

exports.login = login





