const job = require('../middlewares/job.js')
const auth = require('../middlewares/admin.auth.js')
// const api_job_all = require('../logic/api.job.all.js');
// const api_ping_get = require('../logic/api.ping.get.js');
const api_job_get = require('../logic/job/api.job.get.js')
const api_job_create = require('../logic/job/api.job.create.js')
const api_job_update = require('../logic/job/api.job.update.js')
const api_job_remove = require('../logic/job/api.job.remove.js')
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

      return exit(res, 200, 'Success jobs found.', { jobs: jobs })
    })

  })

  // todo //
  app.get('/api/job/stack', auth.adminOnly, function (req, res) {

    // let stack = api_job_stack.get_jobs()
    //
    // return exit(res, 200, 'Job stack:', { jobs: stack })
  })

  app.post('/api/job/create', auth.token_passive, job.create, function (req, res) {

    api_job_create.create({ job: req.body.job, auth: req.body.token }, function (error, new_model) {

      if (error) {
        return exit(res, 422, error.message, error)
      }

      return exit(res, 201, 'Success new job created.', { job: new_model })

    })
  })

  app.get('/api/job/:job', job.get, function (req, res) {

    // api_job_get.get(req.body.job, function (error, job) {
    //
    //   if (error) {
    //     return exit(res, 422, error.message, error)
    //   }
    //
    //   return exit(res, 200, 'Success job found.', { job: job })
    // })
  })

  app.put('/api/job/:job', job.update, function (req, res) {

    api_job_update.update(req.body.job, function (error, new_model) {

      if (error) {
        return exit(res, 422, error.message, error)
      }

      return exit(res, 201, 'Success job updated.', { job: new_model })

    })
  })

  app.delete('/api/job/:job', job.get, function (req, res) {

    api_job_remove.remove(req.body.job, function (error, job) {

      if (error) {
        return exit(res, 422, error.message, error)
      }

      // find all pings and remove
      pings.remove(job)

      return exit(res, 200, 'Success job removed.', { job: job })
    })
  })

  return app

}







