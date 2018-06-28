import React, {Component} from 'react';
import OpenChallenges from "../challenge/OpenChallenges";
import './Common.css'
import HiveProfile from "../user_interaction/HiveProfile";
import Members from "./Members";

class HivePage extends Component {

    constructor(props) {
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

    componentDidMount() {
        fetch('http://94.212.18.127/profile/hive/' + this.props.match.params.name)
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));

        // TODO Fix these fetches!

        // TODO make this open challenges for hives
        fetch('http://94.212.18.127/dares/')
            .then(response => response.json())
            .then(data => this.setState({openChallenges: data}))
            .catch(error => console.log(error));

        // TODO get right challenges
        fetch('http://94.212.18.127/dares/')
            .then(response => response.json())
            .then(data => this.setState({completedChallenges: data}))
            .catch(error => console.log(error));
    }

    render() {
        if (!this.props.match.params.name) {
            return <div/>
            //    dit stukje code zorgt ervoor dat je geen undefined krijgt
        }
        const {openChallenges, completedChallenges, members} = this.state;
        const profileInfo = this.state.profileInfo.hive;

        if (this.state.profileInfo.hive) {
            fetch('http://127.0.0.1:5000/hive/members/' + this.state.profileInfo.hive[0])
                .then(response => response.json())
                .then(data => this.setState({members: data}))
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
                        <Members members={members}/>
                    </div>
                    {/*//*/}
                    <div className="col s2 m3">
                        <h6 className="center">Hive</h6>
                        <HiveProfile profileInfo={profileInfo}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default HivePage;