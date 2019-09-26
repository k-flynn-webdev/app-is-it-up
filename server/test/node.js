// //During the test the env variable is set to test
// // process.env.NODE_ENV = 'test';
// const path = require('path');

// //Require the dev-dependencies
// // let chai = require('chai');
// // let chaiHttp = require('chai-http');
// // let should = chai.should();

// // let app = require('../app.js');

// chai.use(chaiHttp);

// // specific


// describe('Node project starts', () => {

// 	before(function(done) {
// 		setTimeout(function(){
// 			done();
// 		}, 1000);
// 	});

// 	it('it should GET data at "/"', (done) => {
// 		chai.request(app)
// 		.get('/')
// 		.end((err, res) => {
// 			res.should.have.status(200);
// 			res.body.toString().length.should.be.above(3);
// 			done();
// 		});
// 	});
// });

// describe('Node loaders', () => {

// 	let loader = path.join(__dirname, '..' , 'loaders', 'loaders.js' );

// 	// before(function(done) {
// 	// 	setTimeout(function(){
// 	// 		done();
// 	// 	}, 1000);
// 	// });

// 	it('loader should not return errors.', (done) => {

// 		let result = require(loader)(app)
// 		.then(function(result){
// 			done();
// 		}, function(error){
// 			done(error);
// 		})
// 		.catch(function(error){
// 			done(error);
// 		})
// 	});

// });

// describe('Node helpers', () => {

// 	let path_temp = path.join(__dirname, '..');
// 	let array_temp = ['1','1','1','1','1'];
// 	let dir_find = require(path.join(__dirname, '..', 'helpers', 'dir_find.js'));
// 	let list_to_string = require(path.join(__dirname, '..', 'helpers', 'list_to_string.js'));

// 	it('dir_find.js should return an array.', (done) => {
// 		dir_find(path_temp,'.js',function(error, result){
// 			if(error){
// 				done(error);
// 			}

// 			result.length.should.be.above(0);
// 			done();
// 		});
// 	});

// 	it('list_to_string.js should return a string from array.', (done) => {
// 		let tmp = list_to_string(array_temp)
// 		chai.expect(tmp).to.equal('[ 1, 1, 1, 1, 1 ]');
// 		done();
// 	});

// });


