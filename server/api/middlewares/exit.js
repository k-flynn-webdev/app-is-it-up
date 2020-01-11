/**
 *
 * @param res
 * @param status
 * @param message
 * @param data
 * @param notify	A notify message to leave the user
 */

function exit (res, status, message, data, notify) {
	res.status(status).json({
		status: status,
		message: message,
		data: data,
		notify: notify
	})
}

module.exports = exit
