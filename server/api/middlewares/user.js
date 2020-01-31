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
	let tmpBody = Object.assign({}, req.body)
	let tmpParams = Object.assign({}, req.params)

	delete req.body
	delete req.params

	Object.keys(tmpBody).map(item => {
		tmpBody[item] = sanitizer(tmpBody[item])
	})

	Object.keys(tmpParams).map(item => {
		tmpParams[item] = sanitizer(tmpParams[item])
	})

	req.body = Object.assign({}, tmpBody)
	req.params = Object.assign({}, tmpParams)

	next()
}

exports.prepare = prepare


