function exit (res, status, message, data, notify) {
	res.status(status).json({
		status: status,
		message: message,
		data: data,
		notify: notify
	})
}

module.exports = exit
