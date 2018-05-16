import React, { Component } from 'react';
import Icon from '../icon/Icon.js'
import './Challenge.css'

class ChallengeIcon extends Component {
	render() {
		return (
			<Icon image={this.props.image}/>
		);
  	}
}

export default ChallengeIcon;