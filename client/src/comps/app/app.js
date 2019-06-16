import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {GamePage, AdminPage} from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import './app.css';

import combinedReducer from '../../redux/reducers.js';
let store=createStore(combinedReducer);


export default class App extends React.Component{

	render() {

		return (
			<Provider store={store}>
				<div className="wrapper font">
					<Router>
						{/*<Route path="/" component={FirstPage} exact/>*/}
						<Route path="/" exact component={GamePage}/>
						{/*<Route path="/admin" component={AdminPage}/>*/}
						<Route path="/admin/:clid" component={AdminPage}/>
					</Router>
				</div>
			</Provider>
		)   
	}
	
}

