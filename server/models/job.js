const mongoose = require('mongoose')
const has = require('../helpers/has.js')
const config = require('../config/config.js')

function defaultHealth () {
	let tmp = []
	for (let i = 0; i < 100; i++) {
		tmp.push({ response: 0, time: null, status: 0 })
	}
	return tmp
}

const job = mongoose.Schema({
	/**
	 * Short hand name, set by the user for this url job
	 */
	name: {
		type: String,
		required: false,
		minlength: [3, 'Job name must be longer than 3 characters'],
		maxlength: [20, 'Job name must be no longer than 20 characters']
	},
	/** url to be requested */
	url: {
		type: String,
		required: [true, 'Url is required'],
		minlength: [4, 'Url must be longer than 4 characters'],
	},
	/** User method for job */
	method: {
		type: String,
		required: false,
		enum: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
		minlength: [3, 'Method must be GET, PUT, POST, PATCH or DELETE'],
		default: 'GET'
	},
	/**
	 * User declared paramaters for job
	 */
	params: {
		type: String,
		required: false,
		default: '',
		maxlength: [30, 'Job parameters must be less than 30 characters']
	},
	/**
	 * User ping in minutes for a job
	 */
	ping: {
		type: Number,
		min: [2, 'A ping between 2 and 120 mins is required.'],
		max: [120, 'A ping between 2 and 120 mins is required.'],
		required: [true, 'A ping between 1 and 59 is required.']
	},
	/**
	 * Is the job currently active/processing on the stack
	 */
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	/**
	 * Result of the last ping
	 */
	status: { type: Boolean, required: false, default: true },
	/**
	 * Recorded fails (object ids) from the last 30+ days
	 */
	fails: { type: Array, required: false },
	/**
	 * An array of the last 30 days of timing results [[day:avg]x30]
	 */
	health: {
		type: Array,
		required: false,
		default: defaultHealth()
	},
	uptime: {
		/** uptime for the last day */
		day: { type: Number, required: false, default: 1 },
		/** uptime for the last week */
		week: { type: Number, required: false, default: 1 },
		/** uptime for the last month */
		month: { type: Number, required: false, default: 1 },
	},
	meta: {
		created: { type: Date, required: false, default: Date.now() },
		updated: { type: Date, required: false, default: Date.now() },
	},
	tick: {
		/** Time of the next tick */
		next: { type: Date, required: true, default: Date.now() },
		/** Current tick num for the month */
		num: { type: Number, required: true, default: 0 },
		/** Maximum number of ticks at this ping count in the month */
		max: { type: Number, required: true, default: 0 },
		/** Lifetime tick count */
		total: { type: Number, required: true, default: 0 },
	},
	/** job hash id (Use the createJobHash to create) */
	job_hash: { type: String, required: true },
	user: {
		id: { type: mongoose.Schema.Types.ObjectId, required: false },
		name: { type: String, required: false },
	}
})

job.pre('save', function (next) {
	this.meta.updated = Date.now()
	updateJobFails(this, next)

	next()
})

job.statics.createJobHash = createJobHash

job.methods.setUrl = setUrl
job.methods.setMethod = setMethod
job.methods.setPing = setPing
job.methods.setJobHash = setJobHash
job.methods.safeExport = safeExport

module.exports = mongoose.model('Job', job)

/**
 * Create unique job hash ID
 *
 * @param   {Model}   input
 * @returns {String}  hash
 */
function createJobHash (input) {
	let temp =
		(input.url +
			input.method +
			input.params +
			input.ping.toString() +
			input.user.id +
			input.user.name)

	let hash = 0, i, chr
	if (temp.length === 0) return hash
	for (i = 0; i < temp.length; i++) {
		chr = temp.charCodeAt(i)
		hash = ((hash << 5) - hash) + chr
		hash |= 0 // Convert to 32bit integer
	}
	return hash
}

function setJobHash () {
	this.job_hash = createJobHash(this)
}

/**
 * Sets job URl
 *
 * @param 	{String} 	input		url
 */
function setUrl (input) {
	let temp = input.toLowerCase().trim()

	if (temp.indexOf('localhost') !== -1) {

	} else {

		let hasDotCom = temp.split('.')
		hasDotCom = hasDotCom.filter(item => item.length > 1)
		let wwwIndex = temp.indexOf('www')
		let httpIndex = temp.indexOf('http')

		if (wwwIndex < 0 && hasDotCom.length < 2) {
			throw Error('Invalid URL')
		}

		if (wwwIndex >= 0 && hasDotCom.length < 3) {
			throw Error('Invalid URL')
		}

		if (httpIndex < 0) {
			temp = 'http://' + temp
		}
	}

	// remove trailing slash
	if (temp.endsWith('/')) {
		temp = temp.substring(0, temp.length - 1)
	}

	// todo look into this in future ??
	// let point = temp.indexOf('.')
	// if (point === -1) return false
	// if (point >= temp.length - 2) return false
	// let tmpsplit = temp.split('.');
	// let delim = tmpsplit[1].replace(/[0-9]/g, '');
	// console.log(delim);
	// this would fail on ip address as url ..
	this.url = temp
}

/**
 * Sets the job Method to use
 *
 * @param {String} input
 */
function setMethod (input) {
	let temp = input.toLowerCase().trim()

	if (temp.indexOf('get') !== -1) {
		temp = 'GET'
	}
	if (temp.indexOf('put') !== -1) {
		temp = 'PUT'
	}
	if (temp.indexOf('post') !== -1) {
		temp = 'POST'
	}
	if (temp.indexOf('delete') !== -1) {
		temp = 'DELETE'
	}
	this.method = temp
}

/**
 * Set the ping details
 *
 * @param {Number} input
 */
function setPing (input) {

	this.ping = input

	let minsInDay = 60 * 24
	let minsInMonth = minsInDay * 30

	this.tick.num = 0
	this.tick.max = minsInMonth / input
	this.tick.next = Date.now()
}

/**
 * Update the job uptime
 *
 * @param {Object} job
 * @param next
 */
function updateJobFails (job, next) {
	// todo have a global cleanup of older fails ..
	// todo remove/cleanup old pings of say 6 months? maybe do this as a cron job ..

	const dayInSeconds = 8.64e7
	let now = Date.now()
	let daysSinceEpoch = Math.floor(now/dayInSeconds)

	let day = 0
	let week = 0
	let month = 0

	for (let i = 0, max = job.fails.length; i < max; i++) {
		let dateInt = Math.floor(job.fails[i].date/dayInSeconds)
		let dateIntDiff = daysSinceEpoch - dateInt

		if (dateIntDiff <= 1) {
			day+=1
		}
		if (dateIntDiff <= 7) {
			week+=1
		}
		if (dateIntDiff <= 30) {
			month+=1
		}
	}

	let dayTickDivide = job.tick.max/30

	job.uptime.day = 1 - (day/dayTickDivide)
	job.uptime.week = 1 - (week/(dayTickDivide*7))
	job.uptime.month = 1 - (month/job.tick.max)

	return next()
}

/**
 * Export a job model with only the items needed.
 *
 * @returns {model}		jobModel minus items
 */
function safeExport () {

	let freshObj = {}

	if (has.item(this.name)) {
		freshObj.name = this.name
	}

	freshObj.url = this.url
	freshObj.method = this.method
	freshObj.params = this.params
	freshObj.ping = this.ping
	freshObj.active = this.active
	freshObj.status = this.status
	freshObj.fails = this.fails.length
	freshObj.health = this.health
	freshObj.uptime = this.uptime
	freshObj.meta = this.meta
	freshObj.tick = this.tick
	freshObj.user = this.user
	freshObj.job_hash = this.job_hash

	return freshObj
}

