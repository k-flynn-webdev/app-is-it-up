const mongoose = require('mongoose');

var ping = mongoose.Schema({
	url : { type: String, required: true },
	status : { type: Number, required: true, default: 0 },	
	date : { type: Number, required: true, default : Date.now() },
	job_hash : { type: String, required: true },
	user : { type: mongoose.Schema.Types.ObjectId, required: false },
})
module.exports = mongoose.model('Ping', ping);


function preSaveFunc(object){
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
// 	date : 'date in seconds of when request was made',
// 	job_id : 'num id of job and its uniqueness',
// 	user : 'owner db id',
// }