const FROM = 'Kubedev <hi@kubedev.co.uk'
const logger = require('../helpers/logger.js')
const mail_config = require('../config/config').mail
const mailgun = require('mailgun-js')({
	apiKey: mail_config.api,
	domain: mail_config.domain,
	host: mail_config.host
})


// // now send email
// const email_data = {
// 	from: 'Kubedev <hi@kubedev.co.uk>',
// 	to: 'flynny85@gmail.com',
// 	subject: 'Welcome',
// 	text: 'Here is your new account, to get started visit : ' + 'sdffsdfd'
// };


let app_temp = null
let has_init = false

const EMAIL_SEND = 'EMAIL_SEND'

function init (app) {
	if (!has_init) {
		app_temp = app
		app.on(EMAIL_SEND, send)
		has_init = true
	}
}

exports.init = init

/**
 * @param data {object}			from, to, subject, text
 */
const send = (data) => {
	mailgun.messages().send(data, (err, result) => {

		if (err) {
			return logger.log(err)
		}

		logger.log(result.id)
		logger.log(result.message)
	})
}

