import React, { Component } from 'react';
import Icon from '../icon/Icon.js'
import './Challenge.css'

class ChallengeSmall extends Component {
	render() {
		return (
			<Icon image={this.props.image}/>
		);
  	}
}

export default ChallengeSmall;