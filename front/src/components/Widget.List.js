import React from 'react';
import Widget from './Widget.js';



function WidgetList({widgets}) {

	if(widgets.length === 0){
		return (<p className="colour-fill-pop"> No items. </p>);
	}

	const list = widgets.map((item, i) => {
		return ( <Widget key={i} widget={widgets[i]} /> );
	})

	return list;
}
export default WidgetList;
