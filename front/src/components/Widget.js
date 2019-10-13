import React, { Component } from 'react';
import './Widget.css';


class Widget extends Component {
	constructor(){
		super();
		this.state = { window : false };
		this.state = { dropdown : false };
		this.state = { mode : '' };
	}


	openDropDown = () => {
		this.setState({ dropdown : true });
	}
	closeDropDown = () => {
		if( this.state.dropdown){
			this.setState({ dropdown : false });
		}
	}

	openWindow = () => {
		this.setState({ window : true });
	}
	closeWindow = () => {
		if( this.state.window){
			this.setState({ window : false });
		}
		this.closeDropDown();
	}

	widgetMode = (mode) => {
		this.setState({ mode : mode });
		this.openWindow();
		this.closeDropDown();
	}

	modeInfo = () => {
		this.widgetMode('info');
	}
	modeUpdate = () => {
		this.widgetMode('update');
	}
	modeDelete = () => {
		this.widgetMode('delete');
	}

	widgetClasses = () => {
		let widget_dropdown = this.state.dropdown ? 'open-dropdown' : '';
		let widget_window = this.state.window ? 'open-window' : '';
		return widget_dropdown + ' ' + widget_window;
	}



	renderIconMethod(){
		return(
			<svg className="ic" width="100%" viewBox="0 0 16 10" version="1.1" xmlns="http://www.w3.org/2000/svg" >
				<path id="ic_method" d="M7.226,9.401l-2.016,0l3.047,-8.745l2.016,0l-3.047,8.745Zm-5.526,-4.357l3.138,1.192l0,2.292l-4.452,-1.984l0,-3.026l4.452,-1.979l0,2.292l-3.138,1.213Zm12.165,-0.026l-3.287,-1.208l0,-2.271l4.595,1.979l0,3.026l-4.595,1.979l0,-2.271l3.287,-1.234Z" />			
			</svg>
		);
	}

	renderIconTime(){
		return(
			<svg className="ic" width="100%" viewBox="0 0 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg" >
				<path id="ic_time" d="M5.042,0.859c-0.001,1.646 -0.045,3.292 0.001,4.937c0.012,0.426 0.352,0.706 0.821,0.548c1.55,-0.52 3.099,-1.043 4.627,-1.624c0.072,0.336 0.11,0.684 0.11,1.042c0,2.727 -2.214,4.941 -4.941,4.941c-2.728,0 -4.942,-2.214 -4.942,-4.941c0,-2.518 1.888,-4.599 4.324,-4.903Zm0.868,9.395l0,-1l-0.5,0l0,1l0.5,0Zm-3.607,-4.223l0,-0.5l-1,0l0,0.5l1,0Zm3.975,-5.172c1.668,0.209 3.079,1.25 3.803,2.695c-1.265,0.444 -2.54,0.861 -3.8,1.318c0.009,-1.338 0.033,-2.676 -0.003,-4.013Z" />			
			</svg>
		);
	}

	renderIconUpTime(){
		return(
			<svg className="ic" width="100%" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" >
				<path id="ic_uptime" d="M10.386,9.053l1.714,0l-3.428,3.429l-3.429,-3.429l1.714,0l0,-3.428l3.429,0l0,3.428Zm-0.5,-2.928l-2.429,0l0,3.428l-1.007,0l2.222,2.222l2.221,-2.222l-1.007,0l0,-3.428Zm-2.929,-2.214l-1.714,0l0,3.428l-3.429,0l0,-3.428l-1.714,0l3.429,-3.429l3.428,3.429Z" />			
			</svg>
		);
	}

	renderOptions(){
		const dropdown = 
			(<button className="widget-dropdown" onClick={this.openDropDown}>
				<svg className="ic_dropdown" height="100%" viewBox="0 0 9 41" version="1.1" xmlns="http://www.w3.org/2000/svg" >
					<path d="M4.134,32.088c2.208,0 4,1.793 4,4c0,2.208 -1.792,4 -4,4c-2.207,0 -4,-1.792 -4,-4c0,-2.207 1.793,-4 4,-4Zm0,-16c2.208,0 4,1.793 4,4c0,2.208 -1.792,4 -4,4c-2.207,0 -4,-1.792 -4,-4c0,-2.207 1.793,-4 4,-4Zm0,-16c2.208,0 4,1.793 4,4c0,2.208 -1.792,4 -4,4c-2.207,0 -4,-1.792 -4,-4c0,-2.207 1.793,-4 4,-4Z"/>
				</svg>
			</button>);

		const close = 
			(<button className="widget-dropdown" onClick={this.closeWindow}>
				<svg className="ic_close" height="100%" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" >
					<path d="M11.837,2.312l-3.829,3.83l3.829,3.829l-1.877,1.878l-3.83,-3.83l-3.829,3.83l-1.878,-1.878l3.829,-3.829l-3.829,-3.83l1.878,-1.878l3.829,3.83l3.829,-3.83c0.626,0.626 1.252,1.252 1.878,1.878Z" />
				</svg>
			</button>);

		let buttonToShow = this.state.dropdown || this.state.window ? close : dropdown;

		return(
			<div>

				{ buttonToShow }

				<div className="drop-down">
					<button className="colour-bg outline" onClick={this.modeInfo}>
						<p> INFO </p>
					</button>
					<button className="colour-bg outline" onClick={this.modeUpdate}>
						<p> UPDATE </p>
					</button>
					<button className="colour-bg outline" onClick={this.modeDelete}>
						<p> DELETE </p>
					</button>
				</div>
			</div>

		);
	}

	renderMethod(){
		return(
		<div className="widget-method text-small">
			{ this.renderIconMethod() }
			<p className="label"> { this.props.widget.method } </p>
		</div>
		)
	}

	renderTime(){
		return(
		<div className="widget-time text-small">
			{ this.renderIconTime() }
			<p className="label"> { this.props.widget.time / 60 } m</p>
		</div>
		)
	}

	renderProps(){
		let tmp = '...';
		if(this.props.widget.props.length > 0){
			tmp = this.props.widget.props;
		}
		if(this.props.widget.props.length > 10){
			tmp = this.props.widget.props.substring(0,10) + '...';
		}

		return(
		<div className="widget-props text-small">
			<p> { tmp } </p>
		</div>
		)
	}

	renderUpTime(){
		const uptime = ((this.props.widget.pings.length / this.props.widget.meta.max) * 100);
		return(
		<div className="widget-uptime text-small">
			{ this.renderIconUpTime() } 
			<p className="label"> { uptime } %</p>
		</div>
		)
	}

	renderActive(){
		const tmp = this.props.widget.active ? 'ACTIVE' : 'INACTIVE';
		return(
		<div className="widget-active text-small">
			<p className="label"> { tmp }  </p>
		</div>
		)
	}




	render(){

		return(
			<div className={ this.widgetClasses() }>

				<div className="widget shadow1 colour-bg outline" onClick={this.closeDropDown}>

					{ this.renderMethod() }

					{ this.renderTime() }
					
					{ this.renderProps() }

					{ this.renderUpTime() }

					{ this.renderOptions() }

					<div className="widget-url">
						<p> { this.props.widget.url } </p>
					</div>

					{ this.renderActive() }

					<div className="widget-window shadow1 colour-bg outline">
						{ this.state.mode }
					</div>

				</div>

			</div>
		);
	}
}

export default Widget;

