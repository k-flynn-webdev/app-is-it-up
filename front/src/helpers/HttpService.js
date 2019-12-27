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
  axios.defaults.headers.common['authorization'] = token
}

function remove_auth () {
  axios.defaults.headers.common['authorization'] = null
}

function get_user () {
  let key = localStorage.getItem(USER_TOKEN)
  if (key !== null) {
    set_auth(key)
  } else {
    remove_auth()
  }
}

function get_user_payload () {
  return  JSON.parse(localStorage.getItem(USER_PAYLOAD))
}

function set_user (response) {
  if (response === null || response === undefined) {
    localStorage.removeItem(USER_TOKEN)
    localStorage.removeItem(USER_PAYLOAD)
  } else {
    let result = response.data.data
    localStorage.setItem(USER_TOKEN, result.token)
    localStorage.setItem(USER_PAYLOAD, JSON.stringify(result.account))
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
    get_payload: get_user_payload,
    set: set_user
  },
  get: get,
  post: post,
  put: put,
  patch: patch,
  remove: remove
}
export default services
