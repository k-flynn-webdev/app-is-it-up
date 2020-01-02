import Http from './HttpService.js'

function create (input) {
  const request = Http.post('/api/user', input)
    .then(result => {
      Http.user.set(result)
      return result
    })
  return request
}

function login (input) {
  const request = Http.post('/api/user/login', input)
    .then(result => {
      Http.user.set(result)
      return result
    })
  return request
}

function logout () {
  const request = Http.post('/api/user/logout')
    .then(result => {
      Http.user.set(null)
      return result
    })
  return request
}

function update (input) {
  const request = Http.patch('/api/user', input)
    .then(result => {
      Http.user.set(result)
      return result
    })
  return request
}

function verify (input) {
  const request = Http.get(`/api/user/verify/${input}`)
    .then(result => {
      Http.user.set(result)
      return result
    })
  return request
}

const services = {
  create: create,
  login: login,
  logout: logout,
  update : update,
  verify: verify,
  get_payload: Http.user.get_payload,
}

export default services


