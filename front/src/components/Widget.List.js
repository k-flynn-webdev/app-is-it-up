import React from 'react';
import Widget from './Widget.js';


const urls = ['www.kubedev.co.uk', 'pomodoro.kubedev.co.uk', 'tron.kubedev.co.uk', 'daytrack.kubedev.co.uk', 'bs-bingo.kubedev.co.uk'];


function WidgetList() {
	return(
		<div>	
		{urls.map((user, i) => {
			return ( <Widget key={i} url={urls[i]} /> );
		})}
		</div>
	);
}

export default WidgetList;


// function WidgetList() {
// 	return(
// 		<div>	
// 		{urls.map((user, i) => {
// 			return (
// 				<Widget
// 					key={i}
// 					url={urls[i]}
// 				/>
// 			);
// 		})}
// 		</div>
// 	);
// }

// const urls = ['www.kubedev.co.uk', 'pomodoro.kubedev.co.uk', 'tron.kubedev.co.uk', 'daytrack.kubedev.co.uk', 'bs-bingo.kubedev.co.uk'];

// const widgetItems = urls.map((user, i) => {
// 	return (<Widget key={i} url={urls[i]} />)
// });

// function WidgetList() {
// 	return(
// 		<div>
// 			{widgetItems}
// 		</div>
// 	);
// }