const fs = require('fs');
const path = require('path');

module.exports = function( folder, ext='.js', next ){

	let tmp_paths = [];
	let tmp_files = [];

	function is_dir(input){
		return input.indexOf('.') === -1 ? true : false;
	}

	function is_file(input){
		return input.endsWith(ext) ? true : false;
	}



	function get_files(input){

		let tmp_path = path.join(folder,input);

		fs.readdir(tmp_path, function(error, files){

			if(error){
				next(error);
			}

			for( let i = 0;i < files.length;i++){
				
				if(is_dir(files[i])){
					tmp_paths.push(files[i]);
				}

				if(is_file(files[i])){
					tmp_files.push(path.join(input,files[i]));
				}				
			}

			if(tmp_paths.length > 0){
				get_files(tmp_paths.pop());
			} else {
				next(null, tmp_files);	
			}

		});
	}

	get_files('');
}

