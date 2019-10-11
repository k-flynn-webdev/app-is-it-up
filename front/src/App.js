import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/colour.css';


import WidgetCreate from './components/Widget.Create.js';
import WidgetSearch from './components/Widget.List.Search.js';
import WidgetList from './components/Widget.List.js';


import WidgetService from './helpers/Service.Widget.js';
import ListSearch from './helpers/List.Search.js';



class App extends Component {
	constructor(){
		super();
		this.state = {
			searchField : '',
			widgets : [],
		}
	}


	componentDidMount(){
		this.getWidgetList();
	}

	onSearchChange = (event) => {
		this.setState({ searchField : event.target.value });
	}

	onListChange = () => {
		return ListSearch({ list : this.state.widgets , search : this.state.searchField });
	}

	getWidgetList = () => {
		WidgetService.get_all().then(response => {
			this.setState({ widgets : response.data.data.jobs });
		}).catch(error => {
			this.setState({ widgets : [] });
		});
	}

	render(){
		return(
			<div className="App">
				<h1 className="colour-fill-pop"> Is It Up?</h1>
				<WidgetSearch searchChange={this.onSearchChange} />
				<WidgetCreate create={WidgetService.create} update={this.getWidgetList}/>
				<WidgetList widgets={this.onListChange()} />	
			</div>
		);
	}
}


export default App;

