import React from 'react';
import './Widget.css';

function Widget(props) {

	console.dir(props);

	return(
		<div className="widget">

			<div className="widget-content">
				<p className="text url"> { props.url || 'No url found' } </p>
			</div>

			<div className="widget-right">

				<button className="settings">
					<p>:</p>
				</button>

			</div>

		</div>
	);
}

export default Widget;


