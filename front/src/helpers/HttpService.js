import axios from 'axios'

const USER_TOKEN = 'user_token'
const USER_PAYLOAD = 'user_payload'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept-Version'] = 'v1'

onMount()

function onMount () {
  get_user()
}

function set_auth (auth) {
  let token = `Bearer ${auth}`
  console.log(token)
  axios.defaults.headers.common['authorization'] = token
}

function remove_auth () {
  axios.defaults.headers.common['authorization'] = null
}

function get_user () {
  let key = localStorage.getItem(USER_TOKEN)
  if (key !== null) {
    set_auth(key)
    console.log('successfully added user auth')
    console.log(axios.defaults.headers.common)
  } else {
    remove_auth()
  }
}

function set_user (response) {
  if (response === null || response === undefined) {
    localStorage.removeItem(USER_TOKEN)
    localStorage.removeItem(USER_PAYLOAD)
    console.log('successfully removed user locally')
  } else {
    let result = response.data.data
    localStorage.setItem(USER_TOKEN, result.token)
    localStorage.setItem(USER_PAYLOAD, JSON.stringify(result.account))
    console.log('successfully added user locally')
  }
  get_user()
}

function get (url, params, cfg) {
  return axios.get(url, params, cfg)
}

function post (url, params, cfg) {
  return axios.post(url, params, cfg)
}

function put (url, params, cfg) {
  return axios.put(url, params, cfg)
}

function patch (url, params, cfg) {
  return axios.patch(url, params, cfg)
}

function remove (url, params, cfg) {
  return axios.delete(url, params, cfg)
}

const services = {
  user: {
    get: get_user,
    set: set_user
  },
  get: get,
  post: post,
  put: put,
  patch: patch,
  remove: remove
}
export default services
