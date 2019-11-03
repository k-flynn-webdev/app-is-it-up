const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');
const logger = require('../../../helpers/logger.js');



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

			// does job exist in stack???
			// todo create integration test for this!

			let index = jobs_array.find_job(new_model.job_id);

			if(!new_model.active){
				new_model.has_updated = jobs_array.remove(new_model);
				logger.log(`Job(stack: ${index}) removed: ${new_model.job_id} ${new_model.has_updated}`);
			}
			if(new_model.active && index === -1){
				new_model.has_updated = jobs_array.insert(new_model);
				logger.log(`Job(stack: ${index}) added: ${new_model.job_id} ${new_model.has_updated}`);
			} else {
				new_model.has_updated = jobs_array.update(new_model);
				logger.log(`Job(stack: ${index}) updated: ${new_model.job_id} ${new_model.has_updated}`);
			}

			return next(null,new_model);

		});
	});
}
exports.update = update;




