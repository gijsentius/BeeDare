import React, { Component } from 'react';
// import icon

class challengeSmall extends Component {
	constructor(props) {
		super(props);
		this.state = {isExpanded: false}
		this.handleCollapseInfo.bind(this);
		this.handleExpandInfo.bind(this);
	}

	handleExpandInfo() {
		this.setState({isExpanded: true});
	}

	handleCollapseInfo() {
		this.setState({isExpanded: false});
	}
	
	render() {
		const view = this.state.isExpanded ? (
			<div onClick={this.handleCollapseInfo}>
				
			</div>
		) : (
			<div onClick={this.handleExpandInfo}>

			</div>
		);
    return (
			{view}
		);
  }
}

export default challengeSmall;