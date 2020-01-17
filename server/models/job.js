const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  url: { type: String, required: true },
  method: { type: String, required: false, default: 'GET' },
  params: { type: String, required: false, default: '' },
  ping: { type: Number, required: true },
  /**
   * Is the job currently active/processing
   */
  active: { type: Boolean, required: true, default: true },
  /**
   * Result of the last ping
   */
  status: { type: Boolean, required: true, default: true },
  fails: { type: Array, required: false },
  periods: {
    day: { type: Number, required: true, default: 1 },
    week: { type: Number, required: true, default: 1 },
    month: { type: Number, required: true, default: 1 },
  },
  /**
   * Short hand name, set by the user for this url job
   */
  name: { type: String, required: false },
  /**
   * An array of the last 30 days of timing results [[day:avg]x30]
   */
  health: { typ: Array, required: false },
  meta: {
    created: { type: Date, required: false, default: Date.now() },
    updated: { type: Date, required: false, default: Date.now() },
    max: { type: Number, required: true, default: 0 },
    num: { type: Number, required: true, default: 0 },
    next: { type: Date, required: true, default: Date.now() },
  },
  job_id: { type: String, required: true },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    name: { type: String, required: false },
  },
  can_be_deleted: { type: Boolean, required: true, default: true }
})

function UpdatePeriods (object) {

  let dayInMs = 1000 * 60 * 60 * 24
  let dateNow = new Date().getTime()

  let tmp_day_buckets = [0, 0, 0]

  for (let i = 0; i < object.fails.length; i++) {
    let differenceTime = object.fails[i].date - dateNow
    let differenceDays = differenceTime / dayInMs

    if (differenceDays <= 1) {
      tmp_day_buckets[0] += 1
    }
    if (differenceDays <= 7) {
      tmp_day_buckets[1] += 1
    }
    if (differenceDays <= 30) {
      tmp_day_buckets[2] += 1
    }
  }

  object.periods.day = 1 - (tmp_day_buckets[0] / (object.meta.max / 30))
  object.periods.week = 1 - (tmp_day_buckets[1] / ((object.meta.max / 30) * 7))
  object.periods.month = 1 - (tmp_day_buckets[2] / object.meta.max)
}

function preSaveFunc (object) {
  return object
}

jobSchema.pre('save', function (next) {
  UpdatePeriods(this)
  next()
})

const job = mongoose.model('Job', jobSchema)
module.exports = job

// job.pre('update', function (next) {
// 	UpdatePeriods(this);
// 	preSaveFunc(this);
// 	next();
// });

// spec

// job {
// 	url : 'url to request',
// 	method : 'url method',
// 	props : 'url props',
// 	status : 'result of equest',	
// 	time : 'time in seconds between each request',
// 	active : 'if current request is active',
// pings : 'an array of all the bad requests so far'
// 	meta : {
// 		max : 'maximum calls in 30 days (static)',
// 		num : 'current request item progress num',
// 		next : 'next time in seconds to make a request',
// 	},
// 	job_id : 'num id of job and its uniqueness',
// 	owner : 'owner db id',
// }

// todo remove/cleanup old pings of say 6 months? maybe do this as a cron job ..

