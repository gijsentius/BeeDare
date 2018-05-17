import React from 'react';
import Hives from "../hives/Hives";
import Hive from "../hives/Hive";
import Newsfeed from "./Newsfeed";
import Profile from "../user_interaction/Profile";
import './NewsFeed.css';

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profileInfo: {},
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));
    }

    render() {

        const profileInfo = this.state.profileInfo;

        return (
            <div className="customContainer">
                <div className="row">
                        <div className="col s12 m3 sticky">
                            <Profile profileInfo={profileInfo}/>
                        </div>

                    <div className="col s12 m6 droppedShadowBoxNoScroll">
                        <Newsfeed/>
                    </div>
                        <div className="col s12 m3 sticky">
                            <Hives className="col s4" hives={[<Hive/>, <Hive/>, <Hive/>]}/>
                        </div>

                </div>
            </div>
        )
    }
}

export default NewsFeedPage