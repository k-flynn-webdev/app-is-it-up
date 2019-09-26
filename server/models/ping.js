const mongoose = require('mongoose');

var ping = mongoose.Schema({
	url : { type: String, required: true },
	id : { type: String, required: true },
	result : { type: String, required: true },	
	time: { type: Date, required: true, default : new Date() },
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

