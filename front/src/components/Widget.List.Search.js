import React from 'react';
import './Widget.css';

function WidgetCreate() {

	return(
		<div className="widget">

			<div className="widget-content">
				<p> 
					<input placeholder="Add url" type="text" minlength="4" required /> 
				</p>
			</div>

			<div className="widget-right">

				<div className="settings">
					<p>:</p>
				</div>

				<div className="add">
					<p>Add</p>
				</div>

			</div>

		</div>
	);
}

export default WidgetCreate;


