const mongoose = require('mongoose');

var ping = mongoose.Schema({
	url : { type: String, required: true },
	status : { type: Number, required: true, default: 0 },	
	time : { type: Date, required: true, default : Date.now() },
	job_id : { type: String, required: true },
	owner : { type: mongoose.Schema.Types.ObjectId, required: true },
})
module.exports = mongoose.model('Ping', ping);


function preSaveFunc(objec ){
	return object;
}
exports.preSaveFunc = preSaveFunc;

ping.pre('save', function (next) {
	preSaveFunc(this);
	next();
});
ping.pre('update', function (next) {
	preSaveFunc(this);	
	next();
});

// spec
// a ping will be saved whenever theres been a error? or none 200 result ..
// ping {
// 	url : 'url requested',
// 	status : 'result of request',	
// 	time : 'time in seconds of request',
// 	job_id : 'num id of job and its uniqueness',
// 	owner : 'owner db id',
// }