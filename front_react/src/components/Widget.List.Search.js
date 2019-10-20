import React from 'react';
import './Widget.css';

function WidgetListSearch(props) {
	return(
		<div>
			<input placeholder="Search URLs" type="search" onChange={props.searchChange} /> 
		</div>
	);
}

export default WidgetListSearch;


