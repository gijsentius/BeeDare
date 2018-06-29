import React, { Component } from 'react';
import ChallengeIcon from './ChallengeIcon'

//This class is currently not used
class ChallengeIconBox extends Component {
    // normally this class is given a list with challenge id's through the props
    // has a title
    constructor(props) {
        super(props);
        this.state = {
            challenges: [],
        };
    } 

    // https://jsonplaceholder.typicode.com/photos?albumId=1
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error)); // optioneel
    }

    render() {
        let challenges = this.state.challenges.map((challenge) => 
            <div className="col s4 m2">
                <ChallengeIcon
                    image={'http://localhost:5000/image/' + challenge.images + '/dares'}
                />
            </div>
        );
        return (
            <div className="challenge-icon-box">
                {challenges}
            </div>
        );
    }
}

export default ChallengeIconBox;