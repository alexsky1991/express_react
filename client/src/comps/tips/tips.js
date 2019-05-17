import React from 'react';

import Popup from '../popup'

import './tips.css';


export default class Tips extends React.Component {

	state = {
		fifty: true,
		audi: true,
		call: true,
		popup: false,
		popuз_show: ''
	}


	clickTip50 = () => {

		if(!this.state.fifty)
			return;

		// this.setState({fifty: false})

		this.props.callTip50();

	}

	clickTipAudi = () => {
		if(!this.state.audi)
			return;

		this.setState({
			// audi: false,
			popup: true,
			popup_show: 'audi'
		})
	}

	clickTipCall = () => {
		this.setState({
			popup: true,
			popup_show: 'call'
		})
	}

	closePopup = () => {
		this.setState({
			popup: false
		})
	}

	render() {

		const { fifty, audi, popup, popup_show } = this.state; 

		return (
			<div className="tips">
				<div id="tip50" style={{background: !fifty && "red"}} 
					className="tips_item tips_item_50" 
					onClick={this.clickTip50}></div>

				<div style={{background: !audi && "red"}}
					className="tips_item tips_item_audi" 
					onClick={this.clickTipAudi}></div>

				<div className="tips_item tips_item_call"
					onClick={this.clickTipCall}></div>

				{popup && <Popup show={popup_show} closePopup={this.closePopup} />}
			</div>
		)
	}
}

