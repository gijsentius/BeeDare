import React from 'react';
import Hives from "../hives/Hives";
import Hive from "../hives/Hive";
import Profile from "../user_interaction/Profile";
import Newsfeed from "./Newsfeed";
import './NewsFeed.css';
import scrollToComponent from "react-scroll-to-component";
import Upload from "../upload/Upload";
import {UserContext} from "../UserProvider";
import NotLogIn from "../ErrorMessages/NotLogIn";
import Login from "../user_interaction/login";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: {},
            hives: [],
            username: null,
            token: null,
        };
    }

    fetchImportant() {
        fetch('http://94.212.18.127/profile/user/' + this.state.username + "/" + this.state.token)
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));

        fetch('http://94.212.18.127/hive/hives' + )
            .then(response => response.json())
            .then(data => this.setState({hives: data}))
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context) => {
                        this.setState({
                            username: context.loggedInUsername,
                            token: context.token,
                            renderOnce: false
                        });
                        this.fetchImportant();
                    }
                }
                </UserContext.Consumer>
            )
        }

        let listItems = this.state.hives.map((item) =>
            <div className='card-content'>
            <div style={{cursor: 'pointer'}} className='item'>
                <Hive name={item.hiveName} content={item.totalScore} image="https://placeimg.com/400/400/nature" beekeeper={item.beekeeper}/>
            </div>
            </div>
        );


        const profileInfo = this.state.profileInfo[0];
        return (
            <div className="customContainer">
                <div className="row">
                    <div className="col s12 m3 sticky">
                        <Profile profileInfo={profileInfo}/>
                        <a
                            className="waves-effect waves-light btn amber darken-1 center-component top-button"
                            onClick={() => scrollToComponent(this.Blue, {offset: 0, align: 'top', duration: 1500})}>
                            Top</a>
                    </div>
                    <div className="col s12 m6" ref={(section) => {
                        this.Blue = section;
                    }}>
                        <Newsfeed user={this.state.username} token={this.state.token}/>
                    </div>
                    <div className="col s12 m3 sticky">
                        <div className='card centre'>
                            {listItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsFeedPage