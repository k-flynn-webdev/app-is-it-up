const mongoose = require('mongoose');

var user = mongoose.Schema({
	name : { type: String, required: true },
	email : { type: String, required: true },
	password : { type: String, required: true },
	meta : {
		created : { type: Date, required: true, default : Date.now() },
		login : { type: Date, required: true, default : Date.now() },
	},

	jobs : { type: Array, required: false },
})
module.exports = mongoose.model('User', user);


function preSaveFunc(objec ){
	return object;
}
exports.preSaveFunc = preSaveFunc;

user.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
user.pre('update', function (next) {
	preSaveFunc(this);	
	next();
});

// spec

// job {
// 	url : 'url to request',
// 	method : 'url method',
// 	props : 'url props',
// 	status : 'result of equest',	
// 	time : 'time in seconds between each request',
// 	active : 'if current request is active',
// pings : 'an array of all the bad requests so far'
// 	meta : {
// 		max : 'maximum calls in 30 days (static)',
// 		num : 'current request item progress num',
// 		next : 'next time in seconds to make a request',
// 	},
// 	job_id : 'num id of job and its uniqueness',
// 	owner : 'owner db id',
// }

// todo remove/cleanup old pings of say 6 months? maybe do this as a cron job ..

