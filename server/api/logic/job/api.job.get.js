const m_job = require('../../../models/job.js')
const logger = require('../../../helpers/logger.js')

function get ({ job, auth }, next) {

  m_job.findOne({ job_id: job.job_id })
    .then(result => {

      if (!result) {
        throw new Error('No job with that id found.')
      }

      // public job
      if (!result.user.id) {
        return next(null, result)
      }

      if (!auth) {
        if (result.user.id) {
          throw new Error('Must login to see this job.')
        }
      }

      if (auth) {
        if (auth.role === 'admin') {
          return next(null, result)
        }

        if (result.user.id.toString() === auth.id.toString()) {
          return next(null, result)
        }

				throw new Error('User account not allowed.')
      }
    })
    .catch(err => {
      logger.log(err)
      return next(err)
    })
}

exports.get = get






