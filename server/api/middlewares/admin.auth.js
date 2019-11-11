const jwt = require('jsonwebtoken');

const token_cfg = {
	// expires: 60*60*24*7,
	expires: 60,
	secret: 'testSecret',
}
const example = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTI3NTMsImV4cCI6MTU3NDExNzU1M30.SRSqRpqnvPImX6rr282-fDg8T-xwJuztObkBnB5DZW0'
const short = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTUyNjcsImV4cCI6MTU3MzUxNTMyN30.nuO3lxyc-KqHo3KaLQg0X1Dhj5yZo0EYy0WP10BoJxA'


function create( input ){
	let payload =  { email: input.email, role: input.role };
	const JWTToken = jwt.sign( payload, token_cfg.secret, { expiresIn : token_cfg.expires } );
	return JWTToken;
}
exports.create = create;

console.log(create({email:'test@test.com',role:'admin'}))

function exit(res,status,message,data){
	res.status(status).json({
		status : status,
		message : message,
		data : data,
	});
}

function auth (req,res,next) {

	let token = req.headers.authorization;

	if(token === undefined || token === null){
		return exit(res,401,'Missing token')
	}

	if( token ){
		var bearer = 'Bearer'; 
		var hasBearer = token.indexOf(bearer);
		if( hasBearer !== -1){ // is present
			let temp = token.split(bearer);
			token = temp[1].trim();
		} else {
			return exit(res,401,'Invalid token')
		}
	}

	if(token.length !== example.length){
		return exit(res,401,'Invalid token')
	}

	jwt.verify( token, token_cfg.secret, function(error, decoded ){

		if(error){
			return exit(res,401,error.name)
		}

	// 	if( error.name === 'TokenExpiredError' ){
	// 		return response.status(status.client.unauthorized).json({ 
	// 			status : status.client.unauthorized, 
	// 			message : 'token expired, please re-login.'
	// 		});
	// 	}

	// 	return response.status(status.client.unauthorized).json({ 
	// 		status : status.client.unauthorized, 
	// 		message : 'token invalid.'
	// 	});
	// }

	// request.decoded = decoded;
	// request.decoded.raw = token;

		next()
	})
}
exports.auth = auth;



