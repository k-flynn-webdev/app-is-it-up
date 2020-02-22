const sanitizer = require('sanitizer').sanitize
const exit = require('../middlewares/exit.js')
const has = require('../../helpers/has.js')


function missing (property) {
  return `Missing ${property} field.`
}

function create (req, res, next) {
  if (!has.item(req.body.url)) return exit(res, 422, missing('url'))

  next()
}

exports.create = create

function get (req, res, next) {
  if (!has.item(req.params.job_hash)) return exit(res, 422, missing('job id'))

  next()
}

exports.get = get

/**
 * Sanitizes all input and cleans up the raw data
 *
 * @param req
 */
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

