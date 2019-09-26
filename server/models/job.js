const mongoose = require('mongoose');

var job = mongoose.Schema({
	url : { type: String, required: true },
	method : { type: String, required: false, default : 'GET' },
	props : { type: String, required: false, default : '' },
	owner : { type: mongoose.Schema.Types.ObjectId, required: true },
	time : { type: Number, required: true },
	job_id : { type: String, required: true },
	pings : { type: Array, required: false  },	
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

