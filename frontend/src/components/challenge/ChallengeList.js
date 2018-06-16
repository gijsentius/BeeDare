import React, {Component} from 'react';
import ChallengeCard from './ChallengeCard';
import './ChallengeList.css'

class ChallengeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			challenges: [],
		}
	}

	componentDidMount() {
		fetch('http://localhost:5000/dares/')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error)); // optioneel
	}

	render() {
		let challenges = this.state.challenges.map((challenge) =>
			<div className="dare-col">
				<ChallengeCard
					description={challenge.body}
					reward={challenge.body}
					title={challenge.body}
					image={challenge.image}
				/>
			</div>
		);
		return (
			<div className="dare-cols">
				{challenges}
				{/*{console.log(this.state.challenges)}*/}
			</div>
		);
	}
}

export default ChallengeList;