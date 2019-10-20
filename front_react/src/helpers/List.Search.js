
function ListSearch({ list, search }) {

	if(list.length === 0){
		return [];
	}

	return list.filter(item => {
		let test = item.url.toLowerCase().includes(search.toLowerCase());
		if(test) return item;
	});
}
export default ListSearch;



