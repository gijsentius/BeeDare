import React, { Component } from 'react';
import OpenChallenges from "../challenge/OpenChallenges";
import Profile from "../user_interaction/Profile";
import CompletedChallenges from "../challenge/completedChallenges";
import './Common.css'

class HivePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            openChallenges: [],
            completedChallenges: [],
            hiveInfo: [],
            members: [],
            profileInfo: [],
            name: this.props.name
        };
    }

    componentDidMount()
    {
        // TODO Fix these fetches!

        // TODO make this open challenges for hives
        fetch('http://localhost:5000/dares/')
            .then(response => response.json())
            .then(data => this.setState({openChallenges: data}))
            .catch(error => console.log(error));

        // TODO fix fetch
        fetch('http://localhost:5000/profile/hive')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));

        // TODO get right challenges
        fetch('http://localhost:5000/dares/')
            .then(response => response.json())
            .then(data => this.setState({completedChallenges: data}))
            .catch(error => console.log(error));

        fetch('http://127.0.0.1:5000/hive/members/' + this.state.hive_id)
            .then(response => response.json())
            .then(data => this.setState({members: data}))
            .catch(error => console.log(error));
    }

    render() {
        if (!this.props.match.params.name){
            return <div/>
            //    dit stukje code zorgt ervoor dat je geen undefined krijgt
        }
        const {openChallenges, completedChallenges, members} = this.state;
        const profileInfo = this.state.profileInfo[0];

        return (
            <div>
                <h1>{this.props.match.params.name}</h1>
                <div className="row">
                    <div className="col s2 m3">
                        <h6 className="center">Open Dares</h6>
                        <OpenChallenges openChallenges={openChallenges}/>
                    </div>
                    <div className="col s4 m6">
                        <h6 className="center">Achieved Dares</h6>
                        <CompletedChallenges completedChallenges={completedChallenges}/>
                    </div>
                    <div className="col s2 m3">
                        <h6 className="center">Profile</h6>
                        <Profile profileInfo={profileInfo}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default HivePage;