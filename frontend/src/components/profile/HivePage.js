import React, {Component} from 'react';
import OpenChallenges from "../challenge/OpenChallenges";
import './Common.css'
import HiveProfile from "../user_interaction/HiveProfile";
import FriendsList from "./FriendsList";
import {UserContext} from "../UserProvider";
import Redirect from "react-router-dom/es/Redirect";
import Members from "./Members";

class HivePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openChallenges: [],
            completedChallenges: [],
            hiveInfo: [],
            members: {'items': []},
            profileInfo: [],
            name: this.props.name,
            username: null,
            token: null,
            renderOnce: true,
            running: true,
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/profile/hive/' + this.props.match.params.name)
            .then(response => response.json())
            .then(data => this.setState({hiveInfo: data}))
            .catch(error => console.log(error));

        // TODO Fix these fetches!

        // TODO make this open challenges for hives
        fetch('http://localhost:5000/dares/')
            .then(response => response.json())
            .then(data => this.setState({openChallenges: data}))
            .catch(error => console.log(error));

        // TODO get right challenges
        fetch('http://localhost:5000/dares/')
            .then(response => response.json())
            .then(data => this.setState({completedChallenges: data}))
            .catch(error => console.log(error));
    }

    fetchImportant() {
        if (this.state.username) {

            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));

            this.setState({renderOnce: false});
        }
    }

    logged(context) {
        this.setState({
            username: context.loggedInUsername,
            token: context.token
        });
        this.fetchImportant();
    }

    place_button(profileInfo, members) {
        let found = false;
        for (let i = 0; i < members.length; i++) {
            if (profileInfo.username === members[i]) {
                found = true
            }
        }
        if (found) {
            return (<div>
                    <input type='submit' value='Leave.'
                           className="waves-effect waves-light btn amber darken-1 top-button"
                           onClick={() => this.leaveHive(profileInfo)}/></div>
            )
        }
        else {
            return (<div>
                    <input type='submit' value='Join!'
                           className="waves-effect waves-light btn amber darken-1 top-button"
                           onClick={() => this.joinHive(profileInfo)}/></div>
            )
        }

    }

    render() {
        // Het is lastig om met consumer te werken en state. Als je het in render plaatst blijft hij maar updaten
        // op deze manier zorg je ervoor dat je het even weet, en daarna laadt hij de juiste context.
        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context => context.isAuthenticated ? this.logged(context) : <Redirect to={{
                        pathname: '/signin',
                    }}/>)
                }
                </UserContext.Consumer>
            )
        }

        if (!this.props.match.params.name) {
            return <div/>
            //    dit stukje code zorgt ervoor dat je geen undefined krijgt
        }
        const {openChallenges, completedChallenges, members} = this.state;
        const hiveInfo = this.state.hiveInfo.hive;
        const profileInfo = this.state.profileInfo;

        if (this.state.hiveInfo.hive && this.state.running) {
            fetch('http://127.0.0.1:5000/hive/members/' + this.state.hiveInfo.hive[0])
                .then(response => response.json())
                .then(data => this.setState({members: data, running: false}))
                .catch(error => console.log(error));
        }

        return (
            <div>
                {/*<h1>{this.props.match.params.name}</h1>*/}
                <div className="row">
                    {/*Change*/}
                    <div className="col s2 m3">
                        <h6 className="center">Harvest Dares</h6>
                        <OpenChallenges openChallenges={openChallenges}/>
                    </div>
                    <div className="col s4 m6">
                        <h6 className="center">Members</h6>
                        <Members members={members.items}/>
                        <div className='center-component'>
                            {this.place_button(profileInfo, members.items)}
                        </div>
                    </div>
                    {/*//*/}
                    <div className="col s2 m3">
                        <h6 className="center">Hive</h6>
                        <HiveProfile profileInfo={hiveInfo}/>
                    </div>
                </div>
            </div>
        );
    }

    joinHive(profileInfo) {
        let data = new FormData();
        data.append('user_id', profileInfo.id);
        data.append('hive_id', this.state.hiveInfo.hive[0]);
        fetch('http://localhost:5000/hive/join', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => this.setState({response: data.success}))
            .catch(error => console.log(error));
    }

    leaveHive(profileInfo) {
        let data = new FormData();
        data.append('user_id', profileInfo.id);
        data.append('hive_id', this.state.hiveInfo.hive[0]);
        fetch('http://localhost:5000/hive/leave', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => this.setState({response: data.success}))
            .catch(error => console.log(error));
    }
}

export default HivePage;