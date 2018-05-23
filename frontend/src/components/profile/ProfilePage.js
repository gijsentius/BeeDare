import React, { Component } from 'react';
import OpenChallenges from "../challenge/OpenChallenges";
import Profile from "../user_interaction/Profile";
import CompletedChallenges from "../challenge/completedChallenges";
import Friends from "../friends/Friends";
import Block from "../block/Block";
import Friendslist from "../friends/Friendslist";
import './Common.css'

class ProfilePage extends Component {

    constructor(){
        super();
        this.state = {
            openChallenges: [],
            completedChallenges: [],
            profileInfo: [],
            activeFriends: [],
            isLoading: true,
        };
    }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
            .then(response => response.json())
            .then(data => this.setState({openChallenges: data, isLoading: false}))
            .catch(error => console.log(error));

        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data, isLoading: false}))
            .catch(error => console.log(error));

        fetch('https://jsonplaceholder.typicode.com/photos?albumId=15')
            .then(response => response.json())
            .then(data => this.setState({completedChallenges: data, isLoading: false}))
            .catch(error => console.log(error));

        fetch('https://jsonplaceholder.typicode.com/photos?albumId=20')
            .then(response => response.json())
            .then(data => this.setState({activeFriends: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    render() {

        const {openChallenges, isLoading, profileInfo, completedChallenges, activeFriends} = this.state;

        return (
            <div>

                <div className="row">
                    <p>{console.log(isLoading)}</p>
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
                <div className="row">
                    <div className="col s12">
                        <h6 className="center">Active Friends</h6>
                        <Friends friends={activeFriends}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default ProfilePage;