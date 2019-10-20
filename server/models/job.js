const mongoose = require('mongoose');

var job = mongoose.Schema({
	url : { type: String, required: true },
	method : { type: String, required: false, default : 'GET' },
	params : { type: String, required: false, default : '' },	
	ping : { type: Number, required: true },
	active : { type: Boolean, required: true, default: true },
	status : { type: Boolean, required: true, default: true },
	fails : { type: Array, required: false },
	meta : {
		max : { type: Number, required: true, default: 0 },
		num : { type: Number, required: true, default: 0 },
		next : { type: Date, required: true, default : Date.now() },
	},
	job_id : { type: String, required: true },
	user : { type: mongoose.Schema.Types.ObjectId, required: true },

})
module.exports = mongoose.model('Job', job);


function preSaveFunc(objec ){
	return object;
}
exports.preSaveFunc = preSaveFunc;

job.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
job.pre('update', function (next) {
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

