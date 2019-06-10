import React from 'react';

import './new-item.css';


export default class NewItem extends React.Component {

	deleteItem = () => {
		this.props.deleteNewItem();
	}

	saveItem = () => {
		let item = {
			answers: [],
			question: '',
			id: ''
		}

		item.id = ''+Math.floor(Math.random() * 10000 + 30000);

		item.question = document.getElementById('new_question').value;

		item.answers = [...document.getElementById('item_answers').childNodes].map(el => el.value)

		this.props.addItem(item)

	}

	render() {
 	
		return (
			<div style ={{background: '#7b684a'}} className="item new_item">
				<div className="item_panel">
					<div className="item_question">
						<input id='new_question' type="text"
							className="item_question_input" 
							size='50' 
							placeholder="новый вопрос"
							/>
					</div>
					<div className="item_delete" onClick={this.deleteItem}>удалить</div>
					<div className="item_edit" onClick={this.saveItem}>добавить</div>
				</div>
				<div id="item_answers" className="item_answers">
					<input type="text" className="item_answer_input"
						placeholder="вариант 1"/>
					<input type="text" className="item_answer_input"
						placeholder="вариант 2"/>
					<input type="text" className="item_answer_input"
						placeholder="вариант 3"/>
					<input type="text" className="item_answer_input"
						placeholder="вариант 4"/>
				</div>
			</div>
			
		)
	}
}

