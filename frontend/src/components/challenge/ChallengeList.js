import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ChallengeCard from './ChallengeCard';

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
		let challengePairs = [];
		let challenges = this.state.challenges.map((challenge) => 
			<div className="col s6 m3">
				<ChallengeCard
					description={challenge.thumbnailUrl}
					reward="60 gallons of honey"
					title={challenge.title}
					image={challenge.url}
				/>
			</div>
		);
		let index = 0;
		let tempItems = []
		for(let i=0;i<challenges.length;i++) {
			if(i%4==0 && i>0) {
				index++;
				challengePairs.push(tempItems);
				tempItems = [];
			}
			tempItems.push(challenges[i]);
		}
		let challengesFixed = challengePairs.map((challenges) => 
			<div className="row">
				{challenges}
			</div>
		);
		return (
			<div>
				{challengesFixed}
			</div>
		);
	}
}

export default ChallengeList;