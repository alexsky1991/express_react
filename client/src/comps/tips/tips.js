import React from 'react';

import Audi from '../audi'

import './tips.css';

import {voteEvent} from '../events'

export default class Tips extends React.Component {

	state = {
		fifty: true,
		audi: true,
		audi_show: false,
		call: true
	}


	clickTip50 = () => {

		if(!this.state.fifty)
			return;

		this.setState({fifty: false})

		if(!this.props.callTip50)
			return

		this.props.callTip50();

	}

	clickTipAudi = () => {
		if(!this.state.audi)
			return;

		this.setState({
			audi: false,
			audi_show: true
		})
	}

	clickTipCall = () => {
		this.setState({
			call: false
		})
	}

	closeAudi = () => {
		this.setState({audi_show: false})
	}

	componentDidMount() {
		voteEvent.addListener('loseGame', () => {
			this.setState({
				fifty: true,
				audi: true,
				call: true,
				audi_show: false
			})
		})

		voteEvent.addListener('nextRound', () => {
			this.setState({
				audi_show: false
			})
		})
	}
	
	render() {

		const { fifty, audi, audi_show, call } = this.state; 

		return (
			<div className="tips">
				<div id="tip50" style={{background: !fifty && "red"}} 
					className="tips_item tips_item_50" 
					onClick={this.clickTip50}></div>

				<div style={{background: !audi && "red"}}
					className="tips_item tips_item_audi" 
					onClick={this.clickTipAudi}></div>

				<div style={{background: !call && "red"}} className="tips_item tips_item_call"
					onClick={this.clickTipCall}></div>

				{audi_show && <Audi closeAudi={this.closeAudi}/>}
			</div>
		)
	}
}

