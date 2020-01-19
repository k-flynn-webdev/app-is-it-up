const mail_config = require('../config/config').mail
const logger = require('../helpers/logger.js')
const mailgun = require('mailgun-js')({
	apiKey: mail_config.api,
	domain: mail_config.domain,
	host: mail_config.host
})

const EMAIL_SEND = 'EMAIL_SEND'
const EMAIL_RESET = 'EMAIL_RESET'
const EMAIL_VERIFY = 'EMAIL_VERIFY'
const EMAIL_CREATE = 'EMAIL_CREATE'
const FROM = '"Kubedev" <hi@kubedev.co.uk>'

const welcomeMsg = ((link) => {
	return `Hello, you've signed up to isitup.kubedev.co.uk, to get started visit : \nhttp://127.0.0.1:8080/user/verify/${link}`
})
const verifyMsg = ((link) => {
	return `Hello, you've recently changed your account email, to verify please visit : \nhttp://127.0.0.1:8080/user/verify/${link}`
})
const resetMsg = ((link) => {
	return `Hello, you've recently requested a reset on your account password, to get started visit : \nhttp://127.0.0.1:8080/user/reset/${link}`
})

let app_temp = null
let has_init = false

function init (app) {
	if (!has_init) {
		app_temp = app
		app.on(EMAIL_CREATE, accountCreate)
		app.on(EMAIL_VERIFY, emailVerify)
		app.on(EMAIL_RESET, accountReset)
		has_init = true
	}
}

exports.init = init


/**
 * Email API
 *
 * @param emailData 	{Object}	data to send
 */
const emailSend = (emailData) => {
	mailgun.messages().send(emailData, (err, result) => {

		if (err) {
			return logger.log(err)
		}

		logger.log(result.id)
		logger.log(result.message)
	})
}

/**
 * Send a user account creation email
 *
 * @param to 			{String}	email address to
 * @param verify 	{String}	verify token
 */
const accountCreate = (to, verify) => {
	emailSend({ from: FROM, to: to, subject: 'Welcome', text: welcomeMsg(verify) })
}

/**
 * Send a user account verify email
 *
 * @param to 			{String}	email address to
 * @param verify 	{String}	verify token
 */
const emailVerify = (to, verify) => {
	emailSend({ from: FROM, to: to, subject: 'Update', text: verifyMsg(verify) })
}

/**
 * Send a user reset email
 *
 * @param to 			{String}	email address to
 * @param verify 	{String}	verify link
 */
const accountReset = (to, verify) => {
	emailSend({ from: FROM, to: to, subject: 'Account reset', text: resetMsg(verify) })
}


