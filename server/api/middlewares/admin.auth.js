const path = require('path');
const config = require(path.join(__dirname, '..','..', 'config', 'config.js'));
const jwt = require('jsonwebtoken');


const example = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTI3NTMsImV4cCI6MTU3NDExNzU1M30.SRSqRpqnvPImX6rr282-fDg8T-xwJuztObkBnB5DZW0'
const short = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTUyNjcsImV4cCI6MTU3MzUxNTMyN30.nuO3lxyc-KqHo3KaLQg0X1Dhj5yZo0EYy0WP10BoJxA'


function create( input ){
	let payload =  { email: input.email, role: input.role };
	const JWTToken = jwt.sign( payload, config.token.secret, { expiresIn : config.token.expires } );
	return JWTToken;
}
exports.create = create;

// console.log(create({email:'test@test.com',role:'admin'}))

function exit(res,status,message,data){
	res.status(status).json({
		status : status,
		message : message,
		data : data,
	});
}


function tokenCleanUp (token,res) {
	let tmp = token;
	let bearer = 'Bearer'; 
	let bearerIndex = token.indexOf(bearer);
	if( bearerIndex !== -1){ // is present
		let tmp2 = tmp.split(bearer);
		tmp = tmp2[1].trim();
	} else {
		return exit(res,401,'Invalid token')
	}
	return tmp;
}
exports.tokenCleanUp = tokenCleanUp;


function adminOnly (req,res,next) {

	let token = req.headers.authorization;

	if(token === undefined || token === null){
		return exit(res,401,'Missing token')
	}

	if( token ){
		token = tokenCleanUp(token,res);
	}

	if(token.length !== example.length){
		return exit(res,401,'Invalid token')
	}

	jwt.verify(token,token_cfg.secret, function(error,decoded){

		if(error){
			return exit(res,401,error.name)
		}

		req.body.payload = decoded;
		
		next()
	})
}
exports.adminOnly = adminOnly;



// todo create unit tests for auth


