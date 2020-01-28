const jwt = require('jsonwebtoken')
const m_token = require('../models/token.js')
const config = require('../config/config.js')
const logger = require('../helpers/logger.js')
const exit = require('../services/exit.js')

const tokens_black_listed = []

let magicLinkSetup = [10, 75]


function init () {

	m_token.find()
		.then(items => {

			let oldTokens = []

			// cleanup old tokens
			for (let i = 0, j = items.length; i < j; i++) {
				jwt.verify(items[i].token, config.token.secret, function (error, result) {
					if (error) {
						oldTokens.push(items[i]._id)
					} else {
						tokens_black_listed.push(items[i].token.toString())
					}
				})
			}

			logger.log(tokens_black_listed.length + ' Tokens loaded')

			// remove old tokens
			return m_token.deleteMany({ _id: oldTokens })
		})
		.then(result => {
			logger.log(result.deletedCount + ' Tokens expired & removed')
		})
		.catch(err => {
			logger.log(err)
		})
}

init()

function magic (input) {
	let magicObject = {
		name: input.name,
		time: Date.now(),
		id: input._id
	}
	return jwt.sign(
		magicObject,
		'magic-links-token').toString().substring(magicLinkSetup[0], magicLinkSetup[1])
}

exports.magic = magic

function create (input) {
	let payload = Object.assign({}, input)
	return jwt.sign(payload, config.token.secret, { expiresIn: config.token.expires })
}

exports.create = create

function tokenCleanUp (token) {
	let tmp = token
	let bearer = 'Bearer'
	let bearerIndex = tmp.indexOf(bearer)
	if (bearerIndex !== -1) { // is present
		let tmp2 = tmp.split(bearer)
		tmp = tmp2[1].trim()
	} else {
		return null
	}
	return tmp
}

function tokenHeader (req) {

	let token = null

	if (req && req.headers && req.headers.authorization) {
		token = tokenCleanUp(req.headers.authorization)
	}

	if (token) {
		token = token.toString()
	}

	return token
}

function tokenBlackListCheck (token) {
	let exists = tokens_black_listed.filter(item => item === token)
	if (exists.length > 0) {
		logger.log(`Token previously consumed: ${token}`)
		return true
	}

	return false
}

/**
 * Used for decoding, NOT verifying, used only by the logout route
 * @param token
 * @param req
 * @param res
 * @param next
 */
function tokenDecode (token, req, res, next) {
	let decoded = jwt.decode(token)

	if (!decoded)	 {
		let err = new Error('Token issued appears broken')
		logger.log(err)
		return next(err)
	}

	decoded.logout = true

	req.body = Object.assign(req.body, { token: decoded })
	return next()
}

function tokenVerify (token, req, res, next) {
	jwt.verify(token, config.token.secret, function (error, decoded) {

		if (error) {
			logger.log(error)
			if (error.message === 'jwt expired') {
				// todo send user to relogin!
				return exit(res, 401, error.name || error, 'Please relogin.')
			} else {
				return exit(res, 401, error.name || error, 'Please relogin.')
			}
		}

		req.body = Object.assign(req.body, { token: decoded })

		return next()
	})
}

/**
 * If a token has expired will not error but will continue so the user can be logged out regardless
 *
 * @param req
 * @param res
 * @param next
 */
function logout (req, res, next) {

	let token = tokenHeader(req)

	if (!token || token.length < 100) {
		return exit(res, 401, 'Token required, please login.')
	}

	tokenDecode(token, req, res, next)
}

exports.logout = logout

function required (req, res, next) {

	let token = tokenHeader(req)

	if (!token || token.length < 100) {
		return exit(res, 401, 'Token required, please login.')
	}

	// todo if checking as user/admin make sure token isn't null here!! === invalid token

	if (tokenBlackListCheck(token, res)) {
		return exit(res, 401, 'Token previously consumed.')
	}

	tokenVerify(token, req, res, next)

}

exports.required = required

function passive (req, res, next) {

	let token = tokenHeader(req)

	if (!token || token.length < 100) {
		return next()
	}

	// todo if checking as user/admin make sure token isn't null here!! === invalid token

	if (tokenBlackListCheck(token, res)) {
		return exit(res, 401, 'Token previously consumed.')
	}

	tokenVerify(token, req, res, next)

}

exports.passive = passive

/**
 * Creates a token to blacklist in the db
 */
function add_token_to_blackList (req) {

	let token = tokenHeader(req)

	if (!token || token.length < 100) {
		return Promise.reject('Invalid token recieved.')
	}

	let exists = tokens_black_listed.filter(item => item === token)

	if (exists.length > 0) {
		return Promise.reject('Token already exists.')
	}

	let tmp = new m_token({ token: token })
	return tmp.save()
		.then(() => {
			tokens_black_listed.push(token)
			logger.log('New token added to blacklist.')
			return Promise.resolve('User logged out successfully.')
		})
		.catch(err => {
			logger.log(err)
			return Promise.reject(err)
		})
}

exports.add_token_to_blackList = add_token_to_blackList

// todo create unit tests for auth


