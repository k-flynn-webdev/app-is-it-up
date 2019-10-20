import axios from 'axios';
import UserService from './Service.User.js';

const BASE = '/api/job';
const CREATE = '/create';
const ALL = '/all';


const mergeParams = (params) => {
	let newObj = Object.assign(params, { user : UserService.read() } );
	return newObj;
}

// get via owner
const get_all = (params={}) => axios.post(`${BASE + ALL}`, mergeParams(params))

// get via job
const get_job = (params={}) => axios.get(`${BASE}/${params.job_id}`, mergeParams(params))

// create job
const create = (params={}) => axios.post(`${BASE + CREATE}`, mergeParams(params))

// update job
const update = (params={}) => axios.put(`${BASE}/${params.job_id}`, mergeParams(params))

// remove job
const remove = (params={}) => axios.delete(`${BASE}/${params.job_id}`, mergeParams(params))

const services = {
	get_all : get_all,
	get_job : get_job,
	create : create,
	update : update,
	remove : remove,
}

export default services;


