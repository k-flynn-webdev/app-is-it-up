const m_job = require('../../../models/job.js')
const jobs_array = require('../../../services/jobs/jobs.array.js')

const valid = require('./api.job.shared.js').valid
const shared = require('./api.job.shared.js')

function create ({ job, auth }, next) {

  if (auth && auth.id) {
    job.user = {
      id: auth.id,
      name: auth.name
    }
  }

  create_model(job, function (error, job_model) {

    if (error) {
      return next(error)
    }

    m_job.find({ job_id: job_model.job_id })
      .then(items => {

        if (items.length > 0) {
          throw new Error('Job already exists.')
        }

        job_model.save()
          .then(model => {
            let success = jobs_array.insert(job_model)
            if (!success) {
              throw new Error('A problem occurred on the Job Stack.')
            }

            return next(null, job_model)
          })
      })
      .catch(err => {
        console.log(err)
        // todo make a note of error in log
        return next(err)
      })
  })

}

exports.create = create

function create_model (input, next) {

  if (!valid.url(input.url)) return next(new Error('Invalid URL.'))
  if (!valid.method(input.method)) return next(new Error('Invalid method.'))
  if (!valid.params(input.params)) return next(new Error('Invalid params.'))
  if (!valid.ping(input.ping)) return next(new Error('Invalid ping.'))

  let tmp = new m_job()

  let clean = shared.update(tmp, input)
  clean.job_id = create_id(clean)

  return next(null, clean)
}

exports.create_model = create_model

function create_id (input) {
  let temp = input.url + input.method + input.params + input.ping + input.user.id

  let hash = 0, i, chr
  if (temp.length === 0) return hash
  for (i = 0; i < temp.length; i++) {
    chr = temp.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}





