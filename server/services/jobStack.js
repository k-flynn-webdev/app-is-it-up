const m_job = require('../models/job.js')
const logger = require('../helpers/logger.js')
const has = require('../helpers/has.js')

let has_init = false
let delay_load_jobs = 5;

function init (app) {
	if (!has_init) {
		has_init = true
	}

	app.on('db-on', delayStart)
	return app
}

exports.init = init


let stackInit = false
const stackGlobal = []


function delayStart () {
	setTimeout (() => {
		loadJobStack()
	}, delay_load_jobs * 1000)
}

function loadJobStack () {
	if (stackInit) {
		return
	}

	m_job.find({})
		.then(result => {
			result.filter(item => {
				if (item.active) {
					stackGlobal.push(item)
				}
			})

			stackInit = true
			logger.log(`Jobs loaded: ${stackGlobal.length}`)
		})
		.catch(err => {
			loggger.log(err)
		})
}





