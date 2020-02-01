const sanitizer = require('sanitizer').sanitize
const exit = require('../../services/exit.js')

function exists (input) {
	if (input === null || input === undefined) return false
	if (input.toString().length < 1) return false
	return true
}

exports.exists = exists

function missing (property) {
	return `Missing ${property} field.`
}

function create (req, res, next) {
	if (!exists(req.body.name)) return exit(res, 422, missing('name'))
	if (!exists(req.body.email)) return exit(res, 422, missing('email'))
	if (!exists(req.body.password)) return exit(res, 422, missing('password'))

	next()
}

exports.create = create

function verify (req, res, next) {
	if (!exists(req.params)) return exit(res, 422, 'Missing verify link.')
	if (!exists(req.params.verify)) return exit(res, 422, 'Missing verify link.')
	if (req.params.verify.length < 60) return exit(res, 422, 'Invalid verify link.')

	next()
}

exports.verify = verify

function recover (req, res, next) {
	if (!exists(req.params)) return exit(res, 422, 'Missing recover link.')
	if (!exists(req.params.recover)) return exit(res, 422, 'Missing recover link.')
	if (req.params.recover.length < 60) return exit(res, 422, 'Invalid recover link.')

	next()
}

exports.recover = recover

function login (req, res, next) {
	if (!exists(req.body.email)) return exit(res, 422, missing('email'))
	if (!exists(req.body.password)) return exit(res, 422, missing('password'))

	next()
}

exports.login = login

function update (req, res, next) {
	if (Object.keys(req.body).length < 1) {
		return exit(res, 422, 'No properties recieved.')
	}

	next()
}

exports.update = update

function hasEmail (req, res, next) {
	if (!exists(req.body.email)) return exit(res, 422, missing('email'))

	next()
}

exports.hasEmail = hasEmail

function hasPassword (req, res, next) {
	if (!exists(req.body.password)) return exit(res, 422, missing('password'))

	next()
}

exports.hasPassword = hasPassword

function prepare (req, res, next) {

	let tmpToken = null
	let tmpParams = null
	let tmpBody = null

	if (req.body && req.body.token) {
		tmpToken = Object.assign({}, req.body.token)
		delete req.body.token
	}

	if (req.params) {
		tmpParams = Object.assign({}, req.params)
		Object.keys(tmpParams).map(item => {
			tmpParams[item] = sanitizer(tmpParams[item])
		})
		delete req.params
	}

	if (req.body) {
		tmpBody = Object.assign({}, req.body)
		Object.keys(tmpBody).map(item => {
			tmpBody[item] = sanitizer(tmpBody[item])
		})
		delete req.body
	}

	req.body = Object.assign({}, tmpBody)
	req.params = Object.assign({}, tmpParams)

	if (tmpToken) {
		req.body.token = tmpToken
	}

	next()
}

exports.prepare = prepare


