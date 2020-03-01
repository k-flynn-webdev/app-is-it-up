import Http from './HttpService.js'

function all () {
  return Http.get('/api/job/all')
}

function get (jobId) {
  return Http.get(`/api/job/${jobId}`)
}

function create (job) {
  return Http.post('/api/job/create/', prepareJob(job))
}

function update (job) {
  return Http.patch(`/api/job/${job.job_hash}`, prepareJob(job))
}

function remove (job) {
  return Http.remove(`/api/job/${job.job_hash}`)
}

function stack () {
	return Http.get('/api/job/stack')
}

/**
 * Create a job to send for server use (stripping data)
 *
 * @param {Object}  input
 * @returns {Object}
 */
function prepareJob (input) {
  let tmp = {}
  tmp.name = input.name || ''
  tmp.active = input.active
  tmp.url = input.url
  tmp.ping = input.ping
  tmp.method = input.method
  tmp.params = input.params
  tmp.user = input.user
  tmp.job_hash = input.job_hash
  return tmp
}

const services = {
  all: all,
  get: get,
  create: create,
  update: update,
  remove: remove,
  stack: stack
}

export default services







