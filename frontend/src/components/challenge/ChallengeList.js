import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ChallengeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			challenges: [],
		}
	}

	componentWillMount() {
		// fetch data
	}

	render() {
		return (
			<div className="row">
				{challenges}
			</div>
		);
	}
}

export default App;