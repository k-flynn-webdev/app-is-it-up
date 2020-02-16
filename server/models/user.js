const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const has = require('../helpers/has.js')
const config = require('../config/config.js')

const user = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minlength: [5, 'Name must be longer than 5 characters'],
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, 'Email is required'],
		minlength: [4, 'Name must be longer than 4 characters'],
		validate: {
			validator: validEmail,
			message: 'Email is not valid.'
		}
	},
	/**
	 * Always the hashed password, never a password in plaintext
	 */
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [8, 'Password must be longer than 8 characters'],
	},
	meta: {
		login: { type: Date, required: true, default: Date.now() },
		created: { type: Date, required: true, default: Date.now() },
		updated: { type: Date, required: true, default: Date.now() },
		/** Link to validate account, if empty it's already verified */
		link_verify: { type: String, required: false, default: '' },
		/** Link to recover account, if empty it's already recovered */
		link_recover: { type: String, required: false, default: '' },
	},
	/** User roles: ['user', 'admin', 'dev', 'guest'] */
	role: { type: String, required: true, default: 'user', lowercase: true },
	jobs: { type: Array, required: false },
})

user.pre('save', function (next) {
	this.meta.updated = Date.now()
	next()
})

user.statics.createPassword = createPassword

user.methods.safeExport = safeExport
user.methods.comparePassword = comparePassword

module.exports = mongoose.model('User', user)


/**
 * Validates email
 *
 * @param 	{string} 	input		email address
 * @returns {boolean}
 */
function validEmail (input) {
	let tmp = input.split('@')
	if (input.length < 5 || tmp.length < 2) return false
	let domainStop = tmp[1].indexOf('.')
	return (domainStop > 0 && domainStop < tmp[1].length - 1)
}

/**
 * Validates password
 *
 * @param input
 * @returns {string|boolean}
 */
function validPassword (input) {
	let temp = input.toLowerCase()
	return (temp.length >= 8 && has.Number(input) && has.Uppercase(input))
}

/**
 * Create password func, has to be done as async as the setter needs sync ><
 *
 * @param 		{string}		input
 * @param 		{Object}		model		user model to pass
 * @returns 	{promise}		hash
 */
function createPassword (input, model = null) {

	if (!validPassword(input)) {
		return Promise.reject(
			'Password must be at least 8 characters long, have a number and uppercase letter.'
		)
	}

	return bcrypt.genSalt(config.SALT_ROUNDS)
		.then(salt => {
			return bcrypt.hash(config.HASH_SECRET + input, salt)
		})
		.then(hash => {
			if (model) {
				return Promise.resolve([hash, model])
			}
			return Promise.resolve(hash)
		})
		.catch(err => {
			return Promise.reject(err)
		})
}

/**
 * Compares the input against the test (db password)
 *
 * @param {string}			input			user password input
 * @returns {Promise<never>}			on success returns user model
 */
function comparePassword(input) {
	return bcrypt.compare(config.HASH_SECRET + input, this.password)
		.then(passwordTest => {
			if (!passwordTest) {
				throw new Error('Incorrect password.')
			}
			return Promise.resolve(this)
		})
		.catch(err => {
			return Promise.reject(err)
		})
}

/**
 * Export a user model with only the items needed.
 *
 * @param 	{Boolean}	export including meta
 * @returns {model}		userModel minus items
 */
function safeExport (meta = false) {

  let freshUser = {}

  if (has.item(this.name)) {
		freshUser.name = this.name
  }
	if (has.item(this.email)) {
		freshUser.email = this.email
	}
	if (has.item(this.role)) {
		freshUser.role = this.role
	}
	if (meta) {
		freshUser.meta = {
			login: this.meta.login,
			created: this.meta.created,
			updated: this.meta.updated,
			verified: this.meta.link_verify.length < 1
		}
	}
	if (has.item(this._id)) {
		freshUser.id = this._id
	}

	return freshUser
}

