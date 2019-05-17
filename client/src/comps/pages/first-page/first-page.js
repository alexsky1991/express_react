import React from 'react';

import { Link } from 'react-router-dom'

import './first-page.css';

const FirstPage = () => {
	return (
		<div className="first">
			<div className="first_content">
				<Link className="first_button" to="/game">Начать игру</Link>
			</div>
			
		</div>
	)
}

export default FirstPage;