const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');



function update(job,next){

	shared.find(job,function(error,{found}){

		if(error){
			return next(error);
		}

		if(found.length === 0){
			return next(new Error('Job does not exist.'));
		}

		let new_model = shared.update(found[0],job);

		new_model.save(function(result){

			if(error){
				return next(error);
			}

			new_model.has_updated = jobs_array.update(new_model);
			return next(null,new_model);

		});		
	});
}
exports.update = update;




