//Here we init all service funcs that have a .init(app).
const fs = require('fs');
const path = require('path');
const list_to_string = require(path.join(__dirname, '..' , 'helpers', 'list_to_string.js' ));
const dir_find = require(path.join(__dirname, '..' , 'helpers', 'dir_find.js' ));


module.exports = function( app ){

	return new Promise( function(resolve, reject){

		let temp_dir = path.join(__dirname, '..' , 'services' );

		if (!fs.existsSync(temp_dir)){
			fs.mkdirSync(temp_dir);
		}

		dir_find(temp_dir, '.js', function(error, result) {

			if(error){
				return reject(error);
			}

			let init_files = [];

			// apply init interfaces ..
			for( let i = 0; i < result.length; i++){
				let tmp = require( path.join(temp_dir, result[i] ));
				if( tmp.init !== undefined ){
					tmp.init(app);
					init_files.push(result[i]);
				}
			}

			return resolve('	✅ Services .init() : ' + list_to_string(init_files));
		});
	})
};
