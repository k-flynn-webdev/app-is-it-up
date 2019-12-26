const path = require('path')
const jwt = require('jsonwebtoken')
const config = require(path.join(__dirname, '..', '..', 'config', 'config.js'))

const example = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTI3NTMsImV4cCI6MTU3NDExNzU1M30.SRSqRpqnvPImX6rr282-fDg8T-xwJuztObkBnB5DZW0'
const short = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1MTUyNjcsImV4cCI6MTU3MzUxNTMyN30.nuO3lxyc-KqHo3KaLQg0X1Dhj5yZo0EYy0WP10BoJxA'

function create (input) {
  let payload = input
  const JWTToken = jwt.sign(payload, config.token.secret, { expiresIn: config.token.expires })
  return JWTToken
}

exports.create = create

// console.log(create({email:'test@test.com',role:'admin'}))

function exit (res, status, message, data) {
  res.status(status).json({
    status: status,
    message: message,
    data: data,
  })
}

function tokenCleanUp (token, res) {
  let tmp = token
  let bearer = 'Bearer'
  let bearerIndex = tmp.indexOf(bearer)
  if (bearerIndex !== -1) { // is present
    let tmp2 = tmp.split(bearer)
    tmp = tmp2[1].trim()
  } else {
  	return null
	}
  return tmp
}

exports.tokenCleanUp = tokenCleanUp

function token_passive (req, res, next) {

  let token = req.headers.authorization.toString()

  if (token === undefined || token === null) {
    return next()
  }

  if (token) {
    token = tokenCleanUp(token, req)
  }

  // todo if checking as user/admin make sure token isn't null here!! === invalid token

  if (token === null || token.length < 100) {
    return next()
  }

  jwt.verify(token, config.token.secret, function (error, decoded) {

    if (error) {
      // todo log error
      if (error.message === 'jwt expired') {
        // todo send user to relogin!
        return exit(res, 401, error.name || error)
      } else {
        return exit(res, 401, error.name || error)
      }
    }

    if (!req.body.token) {
      req.body.token = {}
    }

    req.body.token = Object.assign(req.body.token, decoded)

    return next()
  })
}

exports.token_passive = token_passive

function userOnly (req, res, next) {

  // let token = req.headers.authorization;
  //
  // console.log('req.headers')
  // console.log(req.headers)
  //
  // if(token === undefined || token === null){
  // 	return exit(res,401,'Missing token')
  // }
  //
  // if( token ){
  // 	token = tokenCleanUp(token,res);
  // }
  //
  // if(token.length !== example.length){
  // 	return exit(res,401,'Invalid token')
  // }
  //
  // jwt.verify(token,token_cfg.secret, function(error,decoded){
  //
  // 	if(error){
  // 		return exit(res,401,error.name)
  // 	}
  //
  // 	req.body.payload = decoded;
  //
  // 	next()
  // })
}

exports.userOnly = userOnly

function adminOnly (req, res, next) {

  // let token = req.headers.authorization;
  //
  // if(token === undefined || token === null){
  // 	return exit(res,401,'Missing token')
  // }
  //
  // if( token ){
  // 	token = tokenCleanUp(token,res);
  // }
  //
  // if(token.length !== example.length){
  // 	return exit(res,401,'Invalid token')
  // }
  //
  // jwt.verify(token,token_cfg.secret, function(error,decoded){
  //
  // 	if(error){
  // 		return exit(res,401,error.name)
  // 	}
  //
  // 	req.body.payload = decoded;
  //
  // 	next()
  // })
}

exports.adminOnly = adminOnly

// todo create unit tests for auth


