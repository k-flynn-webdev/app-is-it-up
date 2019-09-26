module.exports = function( array, pre='[ ', post=' ]' ){
	let temp = array.join(', ');

	if(array.length < 1){
		return pre.trim() + post.trim();
	}

	return pre + temp + post;
}