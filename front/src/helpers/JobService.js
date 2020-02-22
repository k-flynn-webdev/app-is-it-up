import Http from './HttpService.js'

function all () {
  return Http.get('/api/job/all')
}

function get (jobId) {
  return Http.get(`/api/job/${jobId}`)
}

function create (job) {
  return Http.post('/api/job/create/', job)
}

function update (job) {
  return Http.patch(`/api/job/${job.job_hash}`, job)
}

function remove (job) {
  return Http.remove(`/api/job/${job.job_hash}`)
}

function stack () {
	return Http.get('/api/job/stack')
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







