import React, { Component } from 'react';
import './Widget.css';


let basic = {
	options : false,
	url : '',
	time : 30,
	method : 'GET',
	props : '',
}


class WidgetCreate extends Component {
	constructor(){
		super();
		this.state = Object.assign({}, basic);
	}


	optionsToggle = () => {
		this.setState({ options : !this.state.options });
	}

	onSubmit = (event) => {
		event.preventDefault();

		// todo validate
		this.props.create( this.state ).then( response => {
			// todo  set success class / anim / visual ?
			this.setState( basic );
			return this.props.update();
		}).catch( error => {
			// todo  alert user to error ?
		});

	}

	updateURL = (event) => {
		this.setState({ url : event.target.value });
	}

	updateTime = (event) => {
		this.setState({ time : event.target.value });
	}

	updateMethod = (event) => {
		this.setState({ method : event.target.value });
	}

	updateProps = (event) => {
		this.setState({ props : event.target.value });
	}

	renderTime(){
		let times = [15,30,45,60];

		const list = times.map((item, i) => {
			return ( <option key={i} value={times[i]}> {times[i]} </option> );
		});

		return (
		<div className="option">
			<label htmlFor="time-opt">Time:</label>
			<select name="time-opt" id="time" value={this.state.time} onChange={this.updateTime} >
				{list}
			</select>
		</div>
		)
	}

	renderMethod(){
		let methods = ['GET','POST','PUT','DELETE'];

		const list = methods.map((item, i) => {
			return ( <option key={i} value={methods[i]}> {methods[i]} </option> );
		});

		return (
		<div className="option">
			<label htmlFor="method-opt">Method:</label>
			<select name="method-opt" id="method" value={this.state.method} onChange={this.updateMethod} >
				{list}
			</select>
		</div>
		)
	}

	renderProps(){
		return (
			<div className="option">
				<span> Props: </span>
				<input name="props-opt" placeholder="eg user123" type="text" maxLength="50" value={this.state.props} onChange={this.updateProps} />
			</div>
		)
	}


	renderWidget(){
		return(
		<div className="widget">
			
				<div className="widget-content">
					<form onSubmit={this.onSubmit}>
						<p>
							<input placeholder="Add url" type="text" minLength="4" required value={this.state.url} onChange={this.updateURL}/> 
						</p>
					</form>
				</div>

				<div className="widget-right">

					<button className="settings" onClick={this.optionsToggle}>
						<p>:</p>
					</button>

					<button className="add" onClick={this.onSubmit} >
						<p>Create</p>
					</button>

				</div>
			
		</div>
	)}

	renderOptions(){
		let option;

		if(this.state.options){
			option = 
			<div className="colour-fill-pop">
				{this.renderTime()}
				{this.renderMethod()}
				{this.renderProps()}
			</div>
		}
		return option;
	}

	render(){
		return(
			<div>
				{this.renderWidget()}
				{this.renderOptions()}
			</div>
		);
	}	
}




export default WidgetCreate;


