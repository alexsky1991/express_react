import React from 'react';

import './audi.css';


export default class Audi extends React.Component {

	render() {
	
		return (
			<div className="popup">
				<div className="popup_close" onClick={this.props.closeAudi}></div>
					<div className="popup_show"></div>
					<div className="popup_footer">
						<div className="popup_variant">A</div>
						<div className="popup_variant">B</div>
						<div className="popup_variant">C</div>
						<div className="popup_variant">D</div>
					</div>
			</div>
		)
	}
}

