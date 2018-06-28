import React, {Component} from 'react';
import OpenChallenges from "../challenge/OpenChallenges";
import Profile from "../user_interaction/Profile";
import CompletedChallenges from "../challenge/completedChallenges";
import {UserContext} from "../UserProvider";
import './Common.css'

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openChallenges: [],
            completedChallenges: [],
            profileInfo: [],
            activeFriends: [],
            username: null,
            token: null,
            renderOnce: true,
            user: this.props.match.params.user,  // the user in the url
            public: false
        };
    }

    fetchImportantPrivate() {
        if (this.state.username) {
            fetch('http://94.212.18.127/dares/open_dares/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({openChallenges: data}))
                .catch(error => console.log(error));

            fetch('http://94.212.18.127/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));

            fetch('http://94.212.18.127/dares/completed_dares/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({completedChallenges: data}))
                .catch(error => console.log(error));

            this.setState({renderOnce: false});
        }
    }

    fetchImportantPublic(username) {
        if (username) {
            fetch('http://94.212.18.127/dares/open_dares/' + username)
                .then(response => response.json())
                .then(data => this.setState({openChallenges: data}))
                .catch(error => console.log(error));

            fetch('http://94.212.18.127/profile/public/user/' + username)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));

            fetch('http://94.212.18.127/dares/completed_dares/' + username)
                .then(response => response.json())
                .then(data => this.setState({completedChallenges: data}))
                .catch(error => console.log(error));

            this.setState({renderOnce: false});
        }
    }

    render() {

        // Het is lastig om met consumer te werken en state. Als je het in render plaatst blijft hij maar updaten
        // op deze manier zorg je ervoor dat je het even weet, en daarna laadt hij de juiste context.
        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context) => {
                        this.setState({
                            username: context.loggedInUsername,
                            token: context.token
                        });
                        if (this.state.user === this.state.username) {
                            this.setState({public: false})
                            this.fetchImportantPrivate();
                        }
                        else {
                            this.setState({public: true})
                            this.fetchImportantPublic(this.state.user);
                        }
                    }
                }
                </UserContext.Consumer>
            )
        }


        if (!this.state.profileInfo) {
            return (
                <div/>
            )
            //    dit stukje code zorgt ervoor dat je geen undefined krijgt
        }

        const {openChallenges, completedChallenges} = this.state;
        const profileInfo = this.state.profileInfo;

        return (
            <div>
                <div className="row">
                    <div className="col s2 m3">
                        <h6 className="center">Open Dares</h6>
                        <OpenChallenges openChallenges={openChallenges} public={this.state.public}/>
                    </div>
                    <div className="col s4 m6">
                        <h6 className="center">Achieved Dares</h6>
                        <CompletedChallenges completedChallenges={completedChallenges} public={this.state.public}/>
                    </div>
                    <div className="col s2 m3">
                        <h6 className="center">Profile</h6>
                        <Profile profileInfo={profileInfo} public={this.state.public}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;