const path = require('path')
const jwt = require('jsonwebtoken')
const m_token = require('../../models/token.js')
const config = require('../../config/config.js')
const logger = require('../../helpers/logger.js')

const tokens_black_listed = []

function init () {
  m_token.find()
    .then(items => {
      logger.log(`Loading black list: ${items.length} tokens.`)
      for(let i =0, j = items.length; i < j;i++){
        tokens_black_listed.push(items[i].token.toString())
      }
    })
    .catch(err => {
      logger.log(err)
    })
}

init()

function create (input) {
  let payload = Object.assign({},input)

  if (payload.raw) {
    delete payload.raw
  }

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

  if (!req.headers.authorization) {
    return next()
  }

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

  // Blacklist check ..
  let exists = tokens_black_listed.filter(item => item === token)
  if (exists.length > 0) {
    logger.log(`Token previously consumed: ${token}`)
    return exit(res, 401, 'Token previously consumed.')
  }

  jwt.verify(token, config.token.secret, function (error, decoded) {

    if (error) {
      logger.log(error)
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

    req.body.token = Object.assign(req.body.token, decoded, { raw: token })

    return next()
  })
}

exports.token_passive = token_passive

function tokenBlackList (token, next) {

  if (!token) {
    return next('No token recieved.')
  }

  if (token.length < 100) {
    return next('Invalid token recieved.')
  }

  let tokenString = token.toString()
  let exists = tokens_black_listed.filter(item => item === tokenString)

  if (exists.length > 0) {
    return next('Token already exists.')
  }

  let tmp = new m_token({ token: token })
  tmp.save()
    .then(item => {
      tokens_black_listed.push(token)
      return next(null, 'User logged out successfully.')
    })
    .catch(err => {
      logger.log(err)
      return next(err)
    })
}

exports.tokenBlackList = tokenBlackList

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


