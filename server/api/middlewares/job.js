const sanitizer = require('sanitizer').sanitize

function exists (input) {
  if (input === null || input === undefined) return false
  if (input.toString().length < 1) return false
  return true
}

exports.exists = exists

function exit (res, status, message, data) {

  let obj = {
    status: status,
    message: message,
    data: data,
  }

  if (process.env.NODE_ENV === 'test') return res(obj)

  return res.status(status).json(obj)
}

function user (req, res, next) {
  if (!exists(req.body.user)) return exit(res, 422, 'Missing user property.')

  prepare(req)
  next()
}

exports.user = user

function get (req, res, next) {
  if (!exists(req.params)) return exit(res, 422, 'Missing job id.')
  if (!exists(req.params.job)) return exit(res, 422, 'Missing job id.')

  prepare(req)
  next()
}

exports.get = get

function create (req, res, next) {

  if (!exists(req.body.url)) return exit(res, 422, 'Missing url property.')
  if (!exists(req.body.ping)) return exit(res, 422, 'Missing ping property.')

  if (!exists(req.body.method)) req.body.method = 'GET'
  if (!exists(req.body.params)) req.body.params = ''

  prepare(req)
  next()
}

exports.create = create

function update (req, res, next) {

  if (!exists(req.params)) return exit(res, 422, 'Missing job id.')
  if (!exists(req.params.job)) return exit(res, 422, 'Missing job id.')
  if (!exists(req.body.user)) return exit(res, 422, 'Missing user property.')

  prepare(req)
  next()
}

exports.update = update

function prepare (input) {

  if (input.body.job === undefined || input.body.job === null) {
    input.body.job = {}
  }

  if (exists(input.body.active)) {
    input.body.job.active = sanitizer(input.body.active)
  }
  if (exists(input.body.url)) {
    input.body.job.url = sanitizer(input.body.url.trim())
  }
  if (exists(input.body.method)) {
    input.body.job.method = sanitizer(input.body.method.trim())
  }
  if (exists(input.body.params)) {
    input.body.job.params = sanitizer(input.body.params.trim())
  }
  if (exists(input.body.ping)) {
    input.body.job.ping = sanitizer(input.body.ping)
  }
  if (exists(input.params) && exists(input.params.job)) {
    input.body.job.job_id = sanitizer(input.params.job)
  }
  if (exists(input.body.user)) {
    input.body.job.user = sanitizer(input.body.user)
  }
}


