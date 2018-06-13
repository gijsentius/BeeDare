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
		fetch('https://92.212.18.127:5000/dares')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error)); // optioneel
	}

	render() {
		let challenges = this.state.challenges.map((challenge) => 
			<div className="dare-col">
				<ChallengeCard
					description={challenge.body_html}
					reward={challenge.value}
					title={challenge.body}
					image={challenge.image}
				/>
			</div>
		);
		return (
			<div className="dare-cols">
				{challenges}
			</div>
		);
	}
}

export default ChallengeList;