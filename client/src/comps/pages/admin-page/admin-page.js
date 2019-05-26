import React from 'react';

import Item from '../../item';
import NewItem from '../../new-item';

import './admin-page.css';


export default class AdminPage extends React.Component {

  state = {
	    data: [],
		  new_item: false,
		  page: 1
	}
	

	componentDidMount() {
    	this.callBackendAPI()
        	.then(res => {
        		this.setState({data: res.data})
        	})
        	.catch(err => console.log(err));
	}


	callBackendAPI = async () => {

    	const response = await fetch('/express_all');
    	const body = await response.json();

    	if (response.status !== 200) 
    		throw Error(body.message) 
      	
    	return body;

  }

  changeData = item => {

		let new_arr = [...this.state.data];

		new_arr = new_arr.map(el => {
			if(el.id === item.id)
				el = item

			return el
		})

		this.setState({data: new_arr}, this.postData);
	}

	deleteItem = (id) => {
		let new_arr = [...this.state.data];

		new_arr = new_arr.filter(el => el.id !== id);

		this.setState({data: new_arr}, this.postData)
	}

	addItem = item => {
		let new_arr = [...this.state.data];

		new_arr.unshift(item);

		this.setState({
			data: new_arr,
			new_item: false
		}, this.postData)
	}

	showNewItem = () => {
		this.setState({new_item: true})
	}

	deleteNewItem = () => {
		this.setState({new_item: false})
	}

	postData = () => {
		fetch('/express_post', {method: 'POST', body: JSON.stringify({
		data: this.state.data
	}),headers:{'content-type': 'application/json'}})
	}

	changeNavigation = e => {
		if(e.target.className !== 'admin_navigation_item')
			return

		this.setState({page: +e.target.innerHTML})
	}
	
	render() {

		const { data, new_item, page } = this.state;

		let number = (page - 1) * 6;

	    let amount_pages;

	    if(data.length % 6 === 0) {
	    	amount_pages = data.length/6;
	    } else {
	    	amount_pages = data.length/6 + 1;
	    }

	    let items = [];

	    for (var i = 1; i <= amount_pages; i++) {
	        items.push(<div key={i} className="admin_navigation_item" 
	            style={{background: page===i ? '#656464':''}}>{i}</div>)
	    } 
	   
		return (
			<div className="admin">
				<div className="admin_header">
					<div className="admin_header_amount">Количество вопросов: {data.length}</div>
					<div className="admin_title">Cписок вопросов:</div>
					<div className="admin_new" onClick={this.showNewItem}>Добавить вопрос</div>
				</div>

				{new_item && <NewItem addItem={this.addItem} deleteNewItem={this.deleteNewItem}/>}
				
				<div className="admin_list">

					{data.slice(number, number + 6).map((el, idx) => <Item key={el.id} item={el} changeData={this.changeData} deleteItem={this.deleteItem}/>)}

				</div>
				<div className="admin_navigation" onClick={this.changeNavigation}>
          			{items}
				</div>
			</div>
		)
	}
}