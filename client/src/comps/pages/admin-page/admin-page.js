import React from 'react';
import {connect} from 'react-redux';

import Item from '../../item';
import NewItem from '../../new-item';

import { Link } from 'react-router-dom';

import {addEl, deleteEl,changeEl} from '../../../modules';

import './admin-page.css';

import { questionsLoadingAC, questionsErrorAC, questionsSetAC } from "../../../redux/questionsAC";


class AdminPage extends React.Component {

    state = {
	    data: [],
		new_item: false,
		page: parseInt(this.props.match.params.clid),
		amount_items:[]
	}
	

	componentDidMount() {

		this.props.dispatch( questionsLoadingAC() );

		let amount_items = Math.floor((document.body.clientHeight - 80) / 82);

		this.setState({amount_items: amount_items});

		window.onresize = () => {
			let new_height_list = document.body.clientHeight - 83;

			amount_items = Math.floor(new_height_list/ 82);

			this.setState({amount_items: amount_items});
			
		}

    	this.callBackendAPI()
        	.then(res => {
        		this.props.dispatch( questionsSetAC(res.data) )
        		this.setState({data: res.data})
        	})
        	.catch(err => {
        		this.props.dispatch( questionsErrorAC() );
        		console.log(err)
        	});
	}

	componentDidUpdate() {
		if(!this.props.match.params.clid)
			return

		if(this.state.page !== parseInt(this.props.match.params.clid)) 
			this.setState({page: parseInt(this.props.match.params.clid)})
	}

	callBackendAPI = async () => {

    	const response = await fetch('/express_all');
    	const body = await response.json();

    	if (response.status !== 200) 
    		throw Error(body.message) 
      	
    	return body;

    }

    changeData = item => {
    	let new_arr = changeEl(item, this.state.data)

		this.setState({data: new_arr}, this.postData);
	}

	deleteItem = (id) => {
		let new_arr = deleteEl(id, this.state.data);

		this.setState({data: new_arr}, this.postData);
	}

	addItem = item => {
		let new_arr = addEl(item, this.state.data);

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
			return;

		this.setState({page: +e.target.innerHTML})
	}
	
	render() {
		if ( this.props.questions.status<=1 ) 
     	 		return <p style={{color:'red'}}>"загрузка..."</p>

		const { data, new_item, page, amount_items } = this.state;

		let number = (page - 1) * amount_items;

	    let amount_pages;
	    let items = [];

	    let classAdminList = 'admin_list';

	    if(amount_items) {
		    if(data.length % amount_items === 0) {
		    	amount_pages = data.length/amount_items;
		    } else {
		    	amount_pages = data.length/amount_items + 1;
		    }

		    if(this.props.questions.status===2) {
		    	return <div className="admin_not-page">
		    				<div>ошибка загрузки данных</div>
		    				<div className="admin_not_found_img"></div>
		    			</div>
		    }

		    amount_pages = Math.floor(amount_pages);

		    if(page === amount_pages) 
				classAdminList += ' admin_list_last'

		    for (var i = 1; i <= amount_pages; i++) {
		        items.push(<Link to={`/admin/${i}`}  key={i} className="admin_navigation_item" 
		            style={{background: page===i ? '#656464':''}}>{i}</Link>)
		    } 
		}
	   
		return (
			<div className="admin">
				<div className="admin_header">
					<div className="admin_header_amount">Количество вопросов: {data.length}</div>
					<div className="admin_title">Cписок вопросов:</div>
					<div className="admin_new" onClick={this.showNewItem}>Добавить вопрос</div>
				</div>
				

		        {new_item &&<NewItem addItem={this.addItem} deleteNewItem={this.deleteNewItem}/>}

										
				<div className={classAdminList}>
					{amount_items && data.slice(number, number + amount_items).map((el, idx) => {

						return <Item key={el.id} item={el} idx={idx} changeData={this.changeData} deleteItem={this.deleteItem}/>
						})
					}

				</div>
				<div className="admin_navigation" onClick={this.changeNavigation}>
          			{items}
				</div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {

  return {
    questions: state.questions,
  };
};

export default connect(mapStateToProps)(AdminPage);
