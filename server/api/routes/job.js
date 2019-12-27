const job = require('../middlewares/job.js')
const auth = require('../middlewares/admin.auth.js')
// const api_job_all = require('../logic/api.job.all.js');
// const api_ping_get = require('../logic/api.ping.get.js');
const api_job_get = require('../logic/job/api.job.get.js')
const api_job_create = require('../logic/job/api.job.create.js')
const api_job_update = require('../logic/job/api.job.update.js')
const api_job_remove = require('../logic/job/api.job.remove.js')
const api_job_shared = require('../logic/job/api.job.shared.js')
const pings = require('../../services/pings/pings.funcs.js')

const api_job_stack = require('../../services/jobs/jobs.array.js')

function exit (res, status, message, data) {
  res.status(status).json({
    status: status,
    message: message,
    data: data,
  })
}

// todo make sure owner is valid & exists ...

module.exports = function (app) {

  app.get('/api/job/all', auth.token_passive, function (req, res) {

    api_job_stack.get_stack(req.body.token, function (error, jobs) {

      if (error) {
        return exit(res, 422, error.message, error)
      }

      let safe_jobs = jobs.map(item => api_job_shared.safe_export(item))

      return exit(res, 200, 'Success jobs found.', { jobs: safe_jobs })
    })
  })

  app.post('/api/job/create', auth.token_passive, job.create, function (req, res) {

    api_job_create.create({ job: req.body.job, auth: req.body.token }, function (error, job) {

      if (error) {
        return exit(res, 422, error.message || error, error)
      }

      let safe_job = api_job_shared.safe_export(job)

      return exit(res, 201, 'Success new job created.', { job: safe_job })
    })
  })

  app.get('/api/job/:job', auth.token_passive, job.get, function (req, res) {

    api_job_get.get({ job: req.body.job, auth: req.body.token }, function (error, job) {

      if (error) {
        return exit(res, 422, error.message || error, error)
      }

      let safe_job = api_job_shared.safe_export(job)

      return exit(res, 200, 'Success job found.', { job: safe_job })
    })
  })

  app.put('/api/job/:job', auth.token_passive, job.update, function (req, res) {

    api_job_update.update({ job: req.body.job, auth: req.body.token }, function (error, job) {

      if (error) {
        return exit(res, 422, error.message || error, error)
      }

      let safe_job = api_job_shared.safe_export(job)

      return exit(res, 201, 'Success job updated.', { job: safe_job })

    })
  })

  app.delete('/api/job/:job', auth.token_passive, job.get, function (req, res) {

    api_job_remove.remove({ job: req.body.job, auth: req.body.token }, function (error, job) {

      if (error) {
        return exit(res, 422, error.message || error, error)
      }

      let safe_job = api_job_shared.safe_export(job)

      pings.remove(job, function(error, pings_removed){

        if (error) {
          return exit(res, 422, error.message || error, error)
        }

        return exit(res, 200, 'Success job removed.', { job: safe_job, pings_removed: pings_removed })
      })

    })
  })

  return app
}







