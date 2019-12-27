const m_job = require('../../../models/job.js')

function get ({ job, auth }, next) {

  m_job.find({ job_id: job.job_id })
    .then(results => {

      // public job
      if (!results[0].user.id) {
        return next(null, results)
      }

      if (!auth) {
        if (results[0].user.id) {
          throw new Error('Must login to see this job.')
        }
      }

      if (auth) {
        if (auth.role === 'admin') {
          return next(null, results)
        }

        if (results[0].user.id.toString() === auth.id.toString()) {
          return next(null, results)
        }

				throw new Error('User account not allowed.')
      }
    })
    .catch(err => {
      // todo log error
      return next(err)
    })
}

exports.get = get






