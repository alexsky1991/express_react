import React from 'react';

import {GamePage, AdminPage} from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import './app.css';


export default class App extends React.Component{

	render() {

		return (
			<div className="wrapper font">
				<Router>
					{/*<Route path="/" component={FirstPage} exact/>*/}
					<Route path="/" exact component={GamePage}/>
					<Route path="/admin" component={AdminPage}/>
				</Router>
			</div>
		)
	}
	
}

