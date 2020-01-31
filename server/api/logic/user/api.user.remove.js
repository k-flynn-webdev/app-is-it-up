// const bcrypt = require('bcrypt')
// const m_user = require('../../../models/user.js')
// const logger = require('../../../helpers/logger.js')
//
// function remove (auth, next) {
//
// 	m_user.findOneAndDelete({ _id: auth.id })
// 		.then(user_model => {
//
// 			if (!user_model || user_model.length > 0) {
// 				throw new Error('User not found')
// 			}
//
// 			console.log('user_model')
// 			console.log(user_model)
// 			// todo check this????
// 		//
// 		//
// 		// 	return updatePassword(user, user_model)
// 		// })
// 		// .then(user_model => {
// 		// 	return user_model.save()
// 		// })
// 		// .then(result => {
// 		// 	return next(null, result)
// 		// })
// 		// .catch(err => {
// 		// 	logger.log(err)
// 		// 	return next(err)
// 		})
// }
//
// module.exports = remove
//
//
//
//
//
