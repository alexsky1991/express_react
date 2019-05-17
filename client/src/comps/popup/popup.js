import React from 'react';

import './popup.css';


export default class Popup extends React.Component {



	render() {

		const { show } = this.props;

		return (
			<div className="popup">
				<div className="popup_close" onClick={this.props.closePopup}></div>
				{show === 'audi' && 
					<div>
						<div className="popup_show"></div>
						<div className="popup_footer">
							<div className="popup_variant">A</div>
							<div className="popup_variant">B</div>
							<div className="popup_variant">C</div>
							<div className="popup_variant">D</div>
						</div>
					</div>
				}

				{show === 'call' && 
					<div>звонок</div>
				}
			</div>
		)
	}
}

