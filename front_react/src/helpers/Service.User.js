
let user_default = '5d8cc974f14001679cb90caf';
let user = Read_Local();


function Read_Local(){
	let tmp = JSON.parse(localStorage.getItem('user'));
	if(tmp === null){
		Update_Local(user_default);
		return user_default;
	}
	return tmp;
}
exports.read = Read_Local;


function Update_Local(input){
	localStorage.setItem('user', JSON.stringify(input));
}
exports.update = Update_Local;

