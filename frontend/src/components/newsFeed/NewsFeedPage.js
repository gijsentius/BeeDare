import React from 'react';
import Hives from "../hives/Hives";
import Hive from "../hives/Hive";
import Profile from "../user_interaction/Profile";
import Newsfeed from "./Newsfeed";
import './NewsFeed.css';
import scrollToComponent from "react-scroll-to-component";
import {UserContext} from "../UserProvider";


class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: {},
            hives: [],
            messages: [],
            title: '',
            message: '',
            username: null,
            token: null,
            renderOnce: true,
        };

        this.setTitle =this.setTitle.bind(this)
        this.setMessage =this.setMessage.bind(this)
    }

    fetchImportant() {
        if (this.state.username) {
            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));

            fetch('http://localhost:5000/hive/hives')
                .then(response => response.json())
                .then(data => this.setState({hives: data}))
                .catch(error => console.log(error));
            this.setState({renderOnce: false});

            // TODO get right ID
            fetch('http://localhost:5000/coll/messages/' + this.state.profileInfo.id)
                .then(response => response.json())
                .then(data => this.setState({messages: data.result}))
                .catch(error => console.log(error));
        }
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

        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context) => {
                        this.setState({
                            username: context.loggedInUsername,
                            token: context.token,
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
                    <Hive name={item.hiveName} content={item.totalScore} image="https://placeimg.com/400/400/nature"
                          beekeeper={item.beekeeper}/>
                </div>
            </div>
        );


        const profileInfo = this.state.profileInfo;
        const messages = this.state.messages;

        return (
            <div className="customContainer">
                <div className="row">
                    <div className="col s12 m3 sticky">
                        <h6 className='center'>Profile</h6>
                        <Profile profileInfo={profileInfo}/>
                        <a
                            className="waves-effect waves-light btn amber darken-1 center-component top-button"
                            onClick={() => scrollToComponent(this.Blue, {offset: 0, align: 'top', duration: 1500})}>
                            Top</a>
                    </div>
                    <div className="col s12 m6" ref={(section) => {
                        this.Blue = section;
                    }}>
                        <h6 className='center'>Messages</h6>
                        <div className='card'>
                            <form onSubmit={(e) => this.addMessage(e)}>
                                <div className='card-content'><textarea id="title"
                                                                        className="materialize-textarea"
                                                                        onChange={this.setTitle}/>

                                    <label htmlFor="title" className='active'>Type your title here.</label>
                                </div>
                                <div className='card-content'><textarea id="message"
                                                                        className="materialize-textarea"
                                                                        onChange={this.setMessage}/>

                                    <label htmlFor="message" className='active'>Type your message here.</label>
                                    <button
                                        className="waves-effect waves-light btn amber darken-1 center-component top-button">Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <Newsfeed messages={messages} user={this.state.username} token={this.state.token}/>
                    </div>
                    <div className="col s12 m3 sticky">
                        <h6 className='center'>Hives</h6>
                        <div className='card centre'>
                            {listItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    setTitle(e){
        this.setState({title: e.target.value})
    }

    setMessage(e){
        this.setState({message: e.target.value})
    }

    addMessage(event) {
        event.preventDefault();

        const form = event.target;
        let data = new FormData(form);
        data.append('user_id', 1);
        data.append('title', this.state.title);
        data.append('message', this.state.message);

        fetch('http://localhost:5000/submit/message', {
            method: 'POST',
            body: data,
        });
    }
}

export default NewsFeedPage