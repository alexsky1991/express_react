import React from 'react';

import {GamePage} from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom'
 
import './app.css';


export default class App extends React.Component{

	state = {
		data: null
	}

	componentDidMount() {
    	this.callBackendAPI()
        	.then(res => this.setState({ data: res.express }))
        	.catch(err => console.log(err));
	}

	callBackendAPI = async () => {

    	const response = await fetch('/express_backend');
    	const body = await response.json();

    	if (response.status !== 200) {
    		throw Error(body.message) 
      	}

    	return body;

  	};

	render() {

		return (
			<div className="wrapper font">
			<p className="App-intro" style={{color:"blue"}}>{this.state.data}</p>
				<Router>
					{/*<Route path="/" component={FirstPage} exact/>*/}
					<Route path="/" component={GamePage}/>

				</Router>
			</div>
		)
	}
	
}

