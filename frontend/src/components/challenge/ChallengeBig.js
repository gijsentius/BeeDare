import React, { Component } from 'react';
import Icon from '../icon/Icon.js'
import './Challenge.css'

class ChallengeBig extends Component {
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
					<p className="text center-align"><strong>Description</strong></p>
					<p className="text center-align">{this.props.description}</p>
					<p className="text center-align"><strong>Reward</strong></p>
					<p className="text center-align">{this.props.reward}</p>
				</div>
			</div>
		) : (
			<div className="card challenge-box hoverable center-component" onClick={this.handleExpandInfo}>
				<div className="card-content">
					<h3 className="text center-align">{this.props.title}</h3>
					<Icon image={this.props.image}/>
				</div>
			</div>
		);
  	}
}

export default ChallengeBig;
