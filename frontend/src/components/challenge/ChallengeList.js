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
        fetch('http://94.212.18.127/dares/')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error)); // optioneel
    }

    render() {

        if (!this.state.challenges){
            return <div/>
        }

        let challenges = this.state.challenges.map((challenge) =>
            <div className="dare-col">
                <ChallengeCard
                    description={challenge.body}
                    reward={challenge.value}
                    title={challenge.value}
                    id={challenge.id}
                    image="https://placeimg.com/400/400/nature"
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