import React from 'react';

import './tips.css';

import {voteEvent} from '../events'

export default class Tips extends React.Component {

	state = {
		fifty: true,
		audi: true,
		audi_show: false,
		call: true,
		call_show: false
	}

	rightAnswer = null;


	clickTip50 = () => {

		if(!this.state.fifty)
			return;

		this.setState({fifty: false})

		if(!this.props.callTip50)
			return;

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
		if(!this.state.call)
			return

		this.setState({
			call: false,
			call_show: true
		})
	}

	closeAudi = () => {

		let tip_audi = document.getElementsByClassName('tip_audi')[0];
		tip_audi.className += " tip_audi_hide";
		
		setTimeout(() => {
			this.setState({audi_show: false})
		}, 1200);
		
	}

	closeCall = () => {
		let tip_call = document.getElementsByClassName('tip_call')[0];
		tip_call.className += " tip_call_hide";

		setTimeout(() => {
			this.setState({call_show: false})
		}, 3000);
	}

	componentDidMount() {
		voteEvent.addListener('loseGame', () => {
			this.setState({
				fifty: true,
				audi: true,
				call: true,
				audi_show: false,
				call_show: false
			})
		})

		voteEvent.addListener('nextRound', () => {
			this.setState({
				audi_show: false,
				call_show: false 
			})
		})

		voteEvent.addListener('sendRightAnswer', answer => {
			this.rightAnswer = answer
		})
	}
	
	render() {

		const { fifty, audi, audi_show, call, call_show } = this.state; 

		let className50 = "tips_item tips_item_50";
		let classNameAudi = "tips_item tips_item_audi";
		let classNameCall = "tips_item tips_item_call";

		if(!fifty) className50 += " reject" 
		if(!audi) classNameAudi += " reject" 
		if(!call) classNameCall += " reject" 


		return (
			<div className="tips">
				<div id="tip50" className={className50} 
					onClick={this.clickTip50}></div>

				<div className={classNameAudi} 
					onClick={this.clickTipAudi}></div>

				<div className={classNameCall}
					onClick={this.clickTipCall}></div>

				<div className="tip_wrapper_window">

					{audi_show && 
						<div className="tip_window tip_audi">
							аудитория думает что правильный ответ: <br/>
							<span className="tip_answer">{this.rightAnswer}</span>
							<span className="tip_close" onClick={this.closeAudi}>&times;</span>
						</div>}
					{call_show && 
						<div className="tip_window tip_call">
							ваш товарищ думает что правильный ответ: <br/>
							<span className="tip_answer">{this.rightAnswer}</span>
							<span className="tip_close" onClick={this.closeCall}>&#215;</span>
						</div>
					}

				</div>
			</div>
		)
	}
}

