// const m_user = require('../../../models/user.js')
// const logger = require('../../../helpers/logger.js')
//
//
// function verify (user, next) {
//
// 	let search = { 'meta.magic_link' : user.verify.toString() }
//
// 	m_user.find(search)
// 		.then(items => {
//
// 				if (items.length === 0) {
// 					throw new Error('Verify link does not exist, please contact support.')
// 				}
//
// 				if (items[0].meta.magic_link.toString() !== user.verify.toString()) {
// 					throw new Error('Verify link does not match, please contact support.')
// 				}
//
// 			items[0].meta.verified = true
// 			items[0].meta.magic_link = ''
//
// 			return items[0].save()
// 		})
// 		.then(result => {
// 			logger.log('New user has been verified: ' + result._id)
// 			return next(null, result)
// 		})
// 		.catch(err => {
// 			logger.log(err, user)
// 			return next(err)
// 		})
// }
//
// module.exports = verify
//
//
//
//
