const m_job = require('../../../models/job.js')

function valid_url (input) {
  let temp = input.toLowerCase().trim()

  if (temp.indexOf('http') === -1) {
    temp = 'http://' + temp
  }

  // remove trailing slash
  if (temp.endsWith('/')) {
    temp = temp.substring(0, temp.length - 1)
  }

  if (temp.indexOf('localhost') !== -1) return temp

  let point = temp.indexOf('.')

  if (point === -1) return false
  if (point >= temp.length - 2) return false

  // todo look into this??
  // let tmpsplit = temp.split('.');
  // let delim = tmpsplit[1].replace(/[0-9]/g, '');
  // console.log(delim);
  // this would fail on ip address as url ..

  return temp
}

function valid_method (input) {
  let temp = input.toLowerCase()
  if (temp.indexOf('post') !== -1) return 'POST'
  if (temp.indexOf('put') !== -1) return 'PUT'
  if (temp.indexOf('delete') !== -1) return 'DELETE'
  return 'GET'
}

function valid_active (input) {
  let temp = input.toString().toLowerCase()
  if (temp == 'true') return true
  if (temp == 'false') return false
  return false
}

function valid_params (input) {
  if (input === undefined || input === null || input === '') return ' '
  return input.toLowerCase()
}

function valid_user (input) {
  let valid_user = '5d8cc974f14001679cb90caf'

  if (input.id === '') {
    return { id: '', name: '' }
  }

  if (input.id.length !== valid_user.length) {
    return false
  }

  return { id: input.id, name: input.name.toLowerCase() }
}

function valid_ping (input) {
  return is_number(input)
}

function valid_id (input) {
  return is_number(input)
}

function valid_status (input) {
  let temp = input.toLowerCase()
  let hasTrue = temp.indexOf('true')
  let hasFalse = temp.indexOf('false')
  if (hasTrue !== -1 || hasFalse !== -1) return true
  return false
  // todo dont like this??
}

function is_number (input) {
  if (input === undefined ||
    input === null ||
    input === '') return false
  let temp = Number(input)
  if (temp.toString() === 'NaN') return false
  if (!Number.isInteger(temp)) return false
  return temp
}

// todo all valid types ..
exports.valid = {
  url: valid_url,
  method: valid_method,
  params: valid_params,
  ping: valid_ping,
  user: valid_user,
  id: valid_id,
  status: valid_status,
}

let seconds_in_month = 60 * 60 * 24 * 30

function meta (input) {
  if (input.ping === undefined || input.ping === null) return false
  let tmp = {
    max: Math.floor(seconds_in_month / Math.floor(input.ping)),
    num: 0,
    next: Date.now(),
  }
  return tmp
}

exports.meta = meta

function exists (input) {
  if (input === null || input === undefined) return false
  if (input.toString().length < 1) return false
  return true
}

function update (model, input) {

  if (exists(input.url)) {
    model.url = valid_url(input.url)
  }
  if (exists(input.method)) {
    model.method = valid_method(input.method)
  }
  if (exists(input.active)) {
    model.active = valid_active(input.active)
  }
  if (exists(input.params)) {
    model.params = valid_params(input.params)
  }
  if (exists(input.ping)) {
    model.ping = valid_ping(input.ping)
    model.meta = meta(input)
  }
  if (exists(input.job_id)) {
    // jobid shouldn't update ..
    // model.job_id = input.job_id;
  }
  if (exists(input.user)) {
    model.user = valid_user(input.user)
  }

  return model
}

exports.update = update

function search_term (input, next) {
  let search = null

  if (exists(input.user) && input.user.length > 1) {
    search = { user: input.user }
  }
  if (exists(input.job_id) && input.job_id.length > 1) {
    search = { job_id: input.job_id }
  }

  if (search === null) {
    return next(new Error('Missing search term.'))
  }

  return next(null, search)
}

function find (job, next, override) {

  if (override) {
    return find_model(job, next)
  }

  search_term(job, function (error, search) {

    if (error) {
      return next(error)
    }

    find_model(search, next)
  })
}

exports.find = find

function find_model (input, next) {
  m_job.find(input, function (error, found) {
    if (error) {
      return next(error)
    }
    return next(null, Object.assign(input, { found: found }))
  })
}

function remove (job, next) {

  search_term(job, function (error, search) {

    if (error) {
      return next(error)
    }

    m_job.deleteMany(search, function (error, result) {

      if (error) {
        return next(error)
      }

      search.result = result

      return next(null, search)

    })
  })
}

exports.remove = remove



