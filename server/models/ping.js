const mongoose = require('mongoose');

var ping = mongoose.Schema({
	url : { type: String, required: true },
	job_id : { type: String, required: true },
	status : { type: Number, required: true, default: 0 },	
	time : { type: Date, required: true, default : new Date() },
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

