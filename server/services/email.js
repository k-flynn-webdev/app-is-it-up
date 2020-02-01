const mail_config = require('../config/config').mail
const logger = require('../helpers/logger.js')
const mailgun = require('mailgun-js')({
	apiKey: mail_config.api,
	domain: mail_config.domain,
	host: mail_config.host
})

const FROM = '"Kubedev" <hi@kubedev.co.uk>'
const ACCOUNT_RESET = 'ACCOUNT_RESET'
const ACCOUNT_VERIFY = 'ACCOUNT_VERIFY'
const ACCOUNT_CREATE = 'ACCOUNT_CREATE'

const welcomeMsg = ((link) => {
	return `Hello, you've signed up to isitup.kubedev.co.uk, to get started visit : \nhttp://127.0.0.1:8080/user/verify/${link}`
})
const verifyMsg = ((link) => {
	return `Hello, you've recently changed your account email or password, to verify please visit : \nhttp://127.0.0.1:8080/user/verify/${link}`
})
const resetMsg = ((link) => {
	return `Hello, you've recently requested a reset on your account password, to get started visit : \nhttp://127.0.0.1:8080/user/reset/${link}`
})



let app_temp = null
let has_init = false

function init (app) {
	if (!has_init) {
		app_temp = app
		app.on(ACCOUNT_CREATE, accountCreate)
		app.on(ACCOUNT_VERIFY, accountVerify)
		app.on(ACCOUNT_RESET, accountReset)
		has_init = true
	}
}

exports.init = init


/**
 * Email API
 *
 * @param emailData 	{Object}	data to send (from, to, subject, text)
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
 * @param user 	{Object}	user object
 */
const accountCreate = (user) => {
	emailSend({ from: FROM, to: user.email, subject: 'Welcome', text: welcomeMsg(user.meta.link_verify) })
}

/**
 * Send a user account verify email
 *
 * @param user 	{Object}	user object
 */
const accountVerify = (user) => {
	emailSend({ from: FROM, to: user.email, subject: 'Update', text: verifyMsg(user.meta.link_verify) })
}

/**
 * Send a user reset email
 *
 * @param user 	{Object}	user object
 */
const accountReset = (user) => {
	emailSend({ from: FROM, to: user.email, subject: 'Account reset', text: resetMsg(user.meta.link_recover) })
}


