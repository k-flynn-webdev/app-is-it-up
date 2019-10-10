const m_job = require('../../../models/job.js');
const jobs_array = require('../../../services/jobs/jobs.array.js');

const valid = require('./api.job.shared.js').valid;
const shared = require('./api.job.shared.js');


function create(input, next){

	create_model(input, function(error, job_model){

		if(error){
			return next(error);
		}

		// does it exist?
		shared.find(job_model,function(error, result){

			if(error){
				return next(error);
			}

			if(result.found.length !== 0){
				return next(new Error('Already exists.'));
			}

			// add to user via event 

			job_model.save(function(error,result){

				if(error){
					return next(error);
				}

				let success = jobs_array.insert(job_model);
				if(!success){
					return next(new Error('A problem occurred on the Job Stack.'));
				}

				// todo add to user via event?

				return next(null,job_model);
			});
		});
	});
}
exports.create = create;


function create_model(input, next){

	if(!valid.url(input.url)) return next(new Error('Invalid URL.'));
	if(!valid.method(input.method)) return next(new Error('Invalid method.'));
	if(!valid.props(input.props)) return next(new Error('Invalid props.'));
	if(!valid.time(input.time)) return next(new Error('Invalid time.'));
	if(!valid.user(input.user)) return next(new Error('Invalid user.'));

	let tmp = new m_job();

	let clean = shared.update(tmp,input);
	clean.job_id = create_id(clean);

	return next(null,clean);
}
exports.create_model = create_model;

function create_id(input) {
	let temp = input.url + input.method + input.props + input.time + input.user;

	let hash = 0, i, chr;
	if (temp.length === 0) return hash;
	for (i = 0; i < temp.length; i++) {
		chr = temp.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}

	return hash;
};





