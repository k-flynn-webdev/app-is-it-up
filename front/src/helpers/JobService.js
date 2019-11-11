import axios from 'axios';
import UserService from './UserService.js';

const BASE = '/api/job';
const STACK = '/api/job/stack';
const CREATE = '/create';
const ALL = '/all';
const ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTUyNjcsImV4cCI6MTU3MzUxNTMyN30.nuO3lxyc-KqHo3KaLQg0X1Dhj5yZo0EYy0WP10BoJxA'

const mergeParams = (params) => {
	return Object.assign(params, { user : UserService.read(), headers: { authorization: 'Bearer ' + ADMIN }});
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


const stack = (params={}) => axios.get(`${STACK}`, mergeParams(params))

const services = {
	get_all : get_all,
	get_job : get_job,
	create : create,
	update : update,
	remove : remove,
	stack : stack,
}

export default services;







