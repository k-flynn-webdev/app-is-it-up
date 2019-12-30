const path = require('path')
const logger = require(path.join('..', '..', 'helpers', 'logger.js'))

// global array of jobs for speed
let jobs = null

let has_init = false;
// creating singleton of jobs ..
(function () {
  if (jobs === null || jobs === undefined) { jobs = [] }
})()

function get_jobs () {
  return jobs
}

exports.get_jobs = get_jobs

function get_stack (auth, next) {

  if (!auth) {
    console.log('returning all public items')
    return next(null, jobs.filter(job => !job.user.id))
  }

  if (auth.role && auth.role === 'admin') {
    console.log('returning all admin items')
    return next(null, jobs)
  }

  if (auth.id && auth.id.length > 10) {
    console.log('returning all user items')
    let tmp = jobs.filter(item => item.user.id && item.user.id.toString() === auth.id.toString())
    return next(null, tmp)
  }

  return next('A problem on the stack occured.')
}

exports.get_stack = get_stack

function init (app) {
  if (!has_init) {
    has_init = true
  }
}

exports.init = init

function find_job (job_id) {
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].job_id === job_id) return i
  }

  return -1
}

exports.find_job = find_job

function find_user (user) {
  let tmp = []
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].user === user) tmp.push(i)
  }
  return tmp
}

exports.find_user = find_user

// todo on job insertion check server time, if new job is < update server timing ..

function insert (job) {
  let search = find_job(job.job_id)
  let inserted = false
  if (search === -1) {
    jobs.push(job)
    inserted = true
    // logger.log('job insert success: ' + '\n' + job );
  }

  return inserted
}

exports.insert = insert

function update (job) {
  let updated = false
  let search = find_job(job.job_id)
  if (search !== -1) {
    let oldVer = jobs[search].toString()
    let newVer = job.toString()
    jobs.splice(search, 1, job)
    updated = true
    // logger.log('job update success: ' + '\n' + newVer );
  }

  return updated
}

exports.update = update

function remove (job) {
  let removed = false
  let search = find_job(job.job_id)
  if (search !== -1) {
    let oldVer = jobs[search].toString()
    jobs.splice(search, 1)
    removed = true
    // logger.log('job remove success:' + '\n' + oldVer );
  }

  return removed
}

exports.remove = remove




