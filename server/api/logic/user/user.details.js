// const m_user = require('../../../models/user.js')
// const logger = require('../../../helpers/logger.js')
//
// function details (auth, next) {
//
// 	m_user.findOne({ _id: auth.id })
// 		.then(result => {
//
// 			if (!result || result.length === 0) {
// 				throw new Error('User does not exist, please contact support.')
// 			}
//
// 			return next(null, result)
// 		})
// 		.catch(err => {
// 			logger.log(err, auth)
// 			return next(err)
// 		})
// }
//
// module.exports = details
//
//
//
//
