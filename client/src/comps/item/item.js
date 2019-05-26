import React from 'react';

import './item.css';


export default class Item extends React.Component {

	state = {
		active: false,
		item: this.props.item
	} 

	editItem = () => {
		this.setState({active: !this.state.active})
	}

	changeQuestion = e => {
		let new_item = {...this.state.item, question: e.target.value};

		this.setState({item: new_item}, () => this.props.changeData(this.state.item))
	}

	changeAnswer = e => {
		let new_item = {...this.state.item};

		let new_value = e.target.value;
		let number = +e.target.getAttribute('number')
		
		new_item.answers = new_item.answers.map((el, idx) => {

			if(idx === number) 
				el = new_value 	
			
			return el
		})

		this.setState({item: new_item}, () => this.props.changeData(this.state.item));
	}

	deleteItem = () => {
		this.props.deleteItem(this.state.item.id)
	}

	render() {

		const { active, item } = this.state;
 	
		return (
			!active ? <div  className="item">
				<div className="item_panel">
					<div className="item_question">{item.question}</div>
					<div className="item_edit" onClick={this.editItem}>редактировать</div>
				</div>
				<div className="item_answers">
					{item.answers.map(elem => {
						return (
							<div key={elem} className="item_answer">{elem}</div>
						)
					})}
				</div>
			</div>
			: <div style ={{background: '#7b684a'}} className="item">
				<div className="item_panel">
					<div className="item_question">
						<input type="text"
							className="item_question_input" 
							size={item.question.length} 
							defaultValue={item.question}
							onBlur={this.changeQuestion}
							/>
					</div>
					<div className="item_delete" onClick={this.deleteItem}>удалить</div>
					<div className="item_edit" onClick={this.editItem}>редактировать</div>
				</div>
				<div className="item_answers">
					{item.answers.map((elem, idx) => {
						return (
							<input key={idx} 
								number={idx}
								className="item_answer_input"
								defaultValue={elem}
								onBlur={this.changeAnswer}/>
						)
					})}
				</div>
			</div>
			
		)
	}
}


