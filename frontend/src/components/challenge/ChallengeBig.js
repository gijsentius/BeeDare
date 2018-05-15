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
			<div className="card challenge-box hoverable" onClick={this.handleCollapseInfo}>
				<div className="card-content">
					<p className="text center-align"><b>Description</b></p>
					<p className="text center-align">{this.props.description}</p>
					<p className="text center-align"><b>Reward</b></p>
					<p className="text center-align">{this.props.reward}</p>
				</div>
			</div>
		) : (
			<div className="card challenge-box hoverable" onClick={this.handleExpandInfo}>
				<div className="card-content">
					<h3 className="text center-align">{this.props.title}</h3>
					<img src={this.props.image} alt="" class="circle responsive-img center-component"/>
				</div>
			</div>
		);
  	}
}

export default ChallengeBig;
