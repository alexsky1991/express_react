import React from 'react';

import './game-page.css';

import Bar from '../../bar';

import {voteEvent} from '../../events'

import { Provider } from '../../context';


export default class GamePage extends React.Component {

	state = {
		pos: 0,
		right: '',
		answers: [],
		question: '',
		condition: false
	}

	componentDidMount() {
    	this.callBackendAPI()
        	.then(res => {
        		let right = res.data.answers[0];
        		console.log(res.data.answers);

        		voteEvent.emit('sendRightAnswer', right);

        		let answers = res.data.answers.sort(() => 0.5 - Math.random());

        		return (
        			this.setState({ 
		        		question: res.data.question,
		        		right: right,
						answers: answers
		        	 })
        		)
        	})
        	.catch(err => console.log(err));
	}


	callBackendAPI = async () => {

    	const response = await fetch('/express_backend');
    	const body = await response.json();

    	if (response.status !== 200) 
    		throw Error(body.message) 
      	
    	return body;

  	}

  	clickItem = e => {

  		let elem = e.target;

  		if(elem.innerHTML === '')
  			return;

  		if(elem.className !== "game_content_answer" || this.state.condition === 'choose')
  			return

  		elem.className = "game_content_answer answer_choose"

  		this.setState({condition: 'choose'},
  			() => setTimeout(() => {
  					let pos;
  					let right_el;

	        		if(elem.innerHTML === this.state.right) {
						elem.className = "game_content_answer answer_right"
						pos = this.state.pos + 1

						voteEvent.emit('nextRound');

						if(pos === 15) {
							setTimeout(() => alert('вы победили'), 1000);
							pos = 0;
						}

	        		} else {
	        			elem.className = "game_content_answer answer_false";
	        			pos = 0;
						setTimeout(() => alert('вы проиграли'), 1000);

	        			voteEvent.emit('loseGame');

		  				right_el = [...document.getElementsByClassName('game_content_answer')].filter(el => el.innerHTML === this.state.right)[0];
		
		  				right_el.className = "game_content_answer answer_right";
		  				
	        		}

  					this.callBackendAPI()
			        	.then(res => {
			        		let right = res.data.answers[0];
			        		console.log(res.data.answers);

							voteEvent.emit('sendRightAnswer', right);

			        		let answers = res.data.answers.sort(() => 0.5 - Math.random());

			        		return (
			        			setTimeout(() => {
			        				elem.className = "game_content_answer";

			        				if(right_el)
						        		right_el.className = "game_content_answer";

				        			this.setState({ 
						        		question: res.data.question,
						        		right: right,
										answers: answers,
										pos: pos,
	  									condition: false
						        	})
				        		}, 1500)
			        		)
			        	})
			        	.catch(err => console.log(err));

  			}, 1500)
  		)
  		
  	}

  	callTip50 = () => {

  		if(this.state.condition) return

		let arr = [...document.getElementsByClassName('game_content_answer')].filter(el => el.innerHTML !== this.state.right)

		let random = Math.floor(Math.random() * 3);

		arr.forEach((el, idx) => {
			if(random !== idx) 
				el.innerHTML =''
		})

	}

	getMoney = () => {
		if(this.state.pos > 4)
			alert('ваш выигрыш 1000')

		if(this.state.pos > 9)
			alert('ваш выигрыш 32000')

		this.setState({pos: 0})

		voteEvent.emit('loseGame');
	}

	
	render() {
		const { pos, answers, question } = this.state;

		return (
			<Provider value={this.callTip50}>
				<div className="game">
					<div className="game_main">

						<Bar pos={pos} />

						<div className="game_main_bg"></div>
						{pos > 4 &&
							<div className="game_money_wrapper">
								<div className="game_money" onClick={this.getMoney}>Забрать деньги</div>
								<div className="game_money_transport">{pos > 9 ? '32000': '1000'}</div>
							</div>
							
						}
						
					</div>
					
					<div className="game_footer">
						<div className="game_content">
							<div className="game_content_question">{question}</div>
							<div className="game_content_answers" onClick={this.clickItem}>
								{ 
									answers.map((el, idx) => {
										let className = "game_content_answer";
										
										return <div key={idx} className={className}>
												{el}
											</div>
									})
								}
							</div>
						</div>
					</div>
				</div>
			</Provider>
		)
	}
}