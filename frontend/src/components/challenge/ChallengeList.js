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
		fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error)); // optioneel
	}

	render() {
		let challenges = this.state.challenges.map((challenge) => 
			<div className="dare-col">
				<ChallengeCard
					description={challenge.thumbnailUrl}
					reward="60 gallons of honey"
					title={challenge.title}
					image={challenge.url}
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