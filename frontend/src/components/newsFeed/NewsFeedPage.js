import React from 'react';
import ReactDOM from 'react-dom';
import Hives from "../hives/Hives";
import Hive from "../hives/Hive";
import Profile from "../user_interaction/Profile";
import ScrollEvent from 'react-onscroll';
import Newsfeed from "./Newsfeed";
import './NewsFeed.css';
import scrollToComponent from "react-scroll-to-component";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: {},
        };
    }

    componentDidMount(){
        fetch('http://localhost:5000/profile/user')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));
    }

    render() {

        const profileInfo = this.state.profileInfo[0];
        return (
            <div className="customContainer">
                <div className="row">
                    <div className="col s12 m3 sticky">
                        <Profile profileInfo={profileInfo}/>
                        <a
                            className="waves-effect waves-light btn amber darken-1 center-component top-button"
                            onClick={() => scrollToComponent(this.Blue, { offset: 0, align: 'top', duration: 1500})}>
                            Top</a>
                    </div>
                    <div className="col s12 m6" ref={(section) => { this.Blue = section; }}>
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