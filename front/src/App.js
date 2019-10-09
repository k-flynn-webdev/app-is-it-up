import React from 'react';
import logo from './logo.svg';
import './App.css';

import WidgetCreate from './components/Widget.Create.js';
import WidgetList from './components/Widget.List.js';


function App() {
	return (
		<div className="App">
			<h1> Is It Up?</h1>
			<WidgetCreate></WidgetCreate>
			<WidgetList></WidgetList>

		</div>
	);
}

export default App;
