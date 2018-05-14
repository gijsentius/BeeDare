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
			<div className="card challenge-box hoverable center-component" onClick={this.handleCollapseInfo}>
				<div className="card-content">
					<h2 className="text center-align">Description</h2>
					<p className="text center-align">{this.props.description}</p>
					<h2 className="text center-align">Reward</h2>
					<p className="text center-align">{this.props.reward}</p>
				</div>
			</div>
		) : (
			<div className="card challenge-box hoverable center-component" onClick={this.handleExpandInfo}>
				<div className="card-content">
					<h1 className="text center-align">{this.props.title}</h1>
					<Icon image={this.props.image}/>
				</div>
			</div>
		);
  	}
}

export default ChallengeSmall;