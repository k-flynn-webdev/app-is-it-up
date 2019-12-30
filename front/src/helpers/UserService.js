import Http from './HttpService.js'

// const ALL = '/all';
// const ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1OTgwMjIsImV4cCI6MTU3NDIwMjgyMn0.i41Bb4rzaMwL3J1TxV2t_zI1ODA2KcMbq30GevFNwsE'

// const mergeParams = (params) => {
// return Object.assign(params, { user : UserService.read(), headers: { authorization: 'Bearer ' + ADMIN }});
// }

// get via owner
// const get_all = (params={}) => axios.post(`${BASE + ALL}`, mergeParams(params))

// let user_default = '5d8cc974f14001679cb90caf';
// let user = read();

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

const services = {
  create: create,
  login: login,
  logout: logout,
  update : update,
  get_payload: Http.user.get_payload,
  // read : read,
}

export default services


