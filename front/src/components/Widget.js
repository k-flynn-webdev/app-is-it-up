import React from 'react';
import './Widget.css';

function Widget(props) {

	return(
		<div className="widget">

			<div className="widget-content">
				<p className="text url"> { props.url || 'No url found' } </p>
			</div>

			<div className="widget-right">

				<div className="settings">
					<p>:</p>
				</div>

				<div className="add">
					<p>O</p>
				</div>

			</div>

		</div>
	);
}

export default Widget;


