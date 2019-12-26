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

const name = {
  size: {
    min: 5
  }
}

// todo need a create user token for header ..

function valid_name (input) {
  let temp = input.toLowerCase()
  if (temp.length < name.size.min) return false
  return temp
}

function valid_email (input) {
  if (input.length < name.size.min) return false
  let tmp = input.split('@')
  if (tmp.length !== 2) return false
  let tmp2 = tmp[1].split('.')
  if (tmp2.length !== 2) return false
  if (tmp2[0].length < 1 && tmp2[1].length < 1) return false
  return input
}

function valid_password (input) {
  let temp = input.toLowerCase()
  if (temp.length < name.size.min) return `Password too short, must be ${name.size.min} characters long.`
  if (!hasNumber(input)) return `Password must contain a number.`
  if (!hasUpperCase(input)) return `Password must have a Uppercase letter.`
  return true
}

// console.log(hasUpperCase('1111') === false);
// console.log(hasUpperCase('1111tttt') === false);
// console.log(hasUpperCase('1111ttttTTT') === true);
// console.log(hasUpperCase('TTTttt') === true);
// console.log(hasUpperCase('!@#!$') === false);

function hasUpperCase (input) {
  let tmpNoNumber = input.replace(/[^A-Za-z]/g, '')
  let upperTmp = tmpNoNumber.toLocaleUpperCase()
  for (let i = 0; i < tmpNoNumber.length; i++) {
    if (tmpNoNumber.charAt(i) === upperTmp.charAt(i)) return true
  }
  return false
}

function hasNumber (input) {
  let strip = input.replace(/\D/g, '')
  if (strip.length > 0) return true
  return false
}

exports.valid = {
  name: valid_name,
  email: valid_email,
  password: valid_password
}

function missing (property) {
  return `Missing ${property} field.`
}

function create (req, res, next) {

  if (!exists(req.body.name)) return exit(res, 422, missing('name'))
  if (!exists(req.body.email)) return exit(res, 422, missing('email'))
  if (!exists(req.body.password)) return exit(res, 422, missing('password'))

  prepare(req)
  next()
}

exports.create = create

function login (req, res, next) {

  if (!exists(req.body.email)) return exit(res, 422, missing('email'))
  if (!exists(req.body.password)) return exit(res, 422, missing('password'))

  prepare(req)
  next()
}

exports.login = login

function update (req, res, next) {
  prepare(req)
  next()
}

exports.update = update

function prepare (input) {
  let tmp = {}
  if (exists(input.body.name)) {
    tmp.name = sanitizer(input.body.name)
  }
  if (exists(input.body.email)) {
    tmp.email = sanitizer(input.body.email)
  }
  if (exists(input.body.password)) {
    tmp.password = sanitizer(input.body.password)
  }
  input.body = { user: tmp }
}


