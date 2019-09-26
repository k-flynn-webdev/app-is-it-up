//Here we import all internal events/subscribers
const fs = require('fs');
const path = require('path');
const list_to_string = require(path.join(__dirname, '..' , 'helpers', 'list_to_string.js' ));
const dir_find = require(path.join(__dirname, '..' , 'helpers', 'dir_find.js' ));


module.exports = function( app ){

	return new Promise( function(resolve, reject){

		let temp_dir = path.join(__dirname, '..' , 'subscribers' );

		if (!fs.existsSync(temp_dir)){
			fs.mkdirSync(temp_dir);
		}

		dir_find(temp_dir, '.js', function(error, result) {

			if(error){
				return reject(error);
			}

			// apply event subscribers ..
			for( let i = 0; i < result.length; i++){
				require( path.join(temp_dir, result[i] ))(app);
			}		

			return resolve('	✅ Event subscribers : ' + list_to_string(result));
		});
	})
};