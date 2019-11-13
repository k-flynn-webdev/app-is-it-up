import axios from 'axios';

const API = 'api';
const USER = 'user';
const CREATE = 'create';
// const ALL = '/all';
// const ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1OTgwMjIsImV4cCI6MTU3NDIwMjgyMn0.i41Bb4rzaMwL3J1TxV2t_zI1ODA2KcMbq30GevFNwsE'

// const mergeParams = (params) => {
	// return Object.assign(params, { user : UserService.read(), headers: { authorization: 'Bearer ' + ADMIN }});
// }

// get via owner
// const get_all = (params={}) => axios.post(`${BASE + ALL}`, mergeParams(params))


let user_default = '5d8cc974f14001679cb90caf';
// let user = read();


function read(){
	let tmp = JSON.parse(localStorage.getItem('user'));
	if(tmp === null){
		update(user_default);
		return user_default;
	}
	return tmp;
}


function update(input){
	localStorage.setItem('user', JSON.stringify(input));
}


const create = (input={}) => axios.post(`/${API}/${USER}/${CREATE}`, input)



const services = {
	create : create,
	update : update,
	read : read,
}

export default services;


