import React, { Component } from 'react';
import Icon from '../icon/Icon.js'
import './ChallengeSmall.css'

class ChallengeSmall extends Component {
	constructor(props) {
		super(props);
		this.state = {isExpanded: false}
		this.handleCollapseInfo = this.handleCollapseInfo.bind(this);
		this.handleExpandInfo = this.handleExpandInfo.bind(this);
	}

	handleExpandInfo() {
		this.setState({isExpanded: true});
	}

	handleCollapseInfo() {
		this.setState({isExpanded: false});
	}
	
	render() {
		return this.state.isExpanded ? (
			<div className="main-light" onClick={this.handleCollapseInfo}>
				<h2 className="text">Description</h2>
				<p className="text">{this.props.description}</p>
				<h2 className="text">Reward</h2>
				<p className="text">{this.props.reward}</p>
			</div>
		) : (
			<div className="main-light" onClick={this.handleExpandInfo}>
				<h1 className="text">{this.props.title}</h1>
				<Icon image={this.props.image}/>
			</div>
		);
  	}
}

export default ChallengeSmall;