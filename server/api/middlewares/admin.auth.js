const path = require('path')
const jwt = require('jsonwebtoken')
const m_token = require('../../models/token.js')
const config = require('../../config/config.js')
const logger = require('../../helpers/logger.js')

const tokens_black_listed = []

function init () {
	m_token.find()
		.then(items => {
			logger.log(`Loading black list: ${items.length} tokens.`)
			for (let i = 0, j = items.length; i < j; i++) {
				tokens_black_listed.push(items[i].token.toString())
			}
		})
		.catch(err => {
			logger.log(err)
		})
}

init()

function create (input) {
	let payload = Object.assign({}, input)
	const JWTToken = jwt.sign(payload, config.token.secret, { expiresIn: config.token.expires })
	return JWTToken
}

exports.create = create

// console.log(create({email:'test@test.com',role:'admin'}))

function exit (res, status, message, data) {
	res.status(status).json({
		status: status,
		message: message,
		data: data,
	})
}

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

function tokenVerify (token, req, res, next) {
	jwt.verify(token, config.token.secret, function (error, decoded) {

		if (error) {
			logger.log(error)
			if (error.message === 'jwt expired') {
				// todo send user to relogin!
				return exit(res, 401, error.name || error)
			} else {
				return exit(res, 401, error.name || error)
			}
		}

		req.body = Object.assign(req.body, { token: decoded})

		return next()
	})
}

function token_required (req, res, next) {

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

exports.token_required = token_required

function token_passive (req, res, next) {

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

exports.token_passive = token_passive

function add_token_to_blackList (req, next) {

	let tokenRaw = null
	if (req.headers && req.headers.authorization) {
		tokenRaw = req.headers.authorization
	}

	if (!tokenRaw) {
		return next('No token recieved.')
	}

	if (tokenRaw.length < 100) {
		return next('Invalid token recieved.')
	}

	let tokenString = tokenRaw.toString()
	let exists = tokens_black_listed.filter(item => item === tokenString)

	if (exists.length > 0) {
		return next('Token already exists.')
	}

	let tmp = new m_token({ token: tokenRaw })
	tmp.save()
		.then(item => {
			tokens_black_listed.push(tokenRaw)
			return next(null, 'User logged out successfully.')
		})
		.catch(err => {
			logger.log(err)
			return next(err)
		})
}

exports.add_token_to_blackList = add_token_to_blackList

// todo create unit tests for auth


