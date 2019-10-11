
function ListSearch({ list, search }) {

	if(list.length === 0){
		return [];
	}

	return list.filter(item => {
		return item.url.toLowerCase().includes(search.toLowerCase());
	});
}
export default ListSearch;



