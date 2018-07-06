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
            running: true,
            friends: [],
            collecting: true
        };

        this.setTitle = this.setTitle.bind(this)
        this.setMessage = this.setMessage.bind(this)
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

    render() {
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

        if (!this.state.profileInfo) {
            return (
                <div/>
            )
            //    dit stukje code zorgt ervoor dat je geen undefined krijgt
        }

        let listItems;

        if(this.state.hives.length === 0){
            listItems = <h6>No hives joined yet!</h6>
        }
        else{
            listItems = this.state.hives.map((item) =>
                <div className='card-content'>
                    <div style={{cursor: 'pointer'}} className='item'>
                        <Hive name={item.hiveName} content={item.totalScore} image="https://placeimg.com/400/400/nature"
                              beekeeper={item.beekeeper}/>
                    </div>
                </div>
            );
        }


        const profileInfo = this.state.profileInfo;

        if(profileInfo.id && this.state.running) {
            fetch('http://localhost:5000/hive/hives/user/' + profileInfo.id)
                .then(response => response.json())
                .then(data => this.setState({hives: data}))
                .catch(error => console.log(error));

            // TODO get right ID
            fetch('http://localhost:5000/coll/messages/' + profileInfo.id)
                .then(response => response.json())
                .then(data => this.setState({messages: data.result}))
                .catch(error => console.log(error));

            fetch('http://localhost:5000/profile/friends/' + profileInfo.id)
                .then(response => response.json())
                .then(data => this.setState({friends: data.friends_id}))
                .catch(error => console.log(error));

            this.setState({running: false})
        }

        if(this.state.friends.length !== 0 && this.state.collecting) {
            for (let i = 0; i < this.state.friends.length; i++) {
                fetch('http://localhost:5000/coll/messages/' + this.state.friends[i])
                    .then(response => response.json())
                    .then(data => this.setState({messages: this.state.messages.concat(data.result)}))
                    .catch(error => console.log(error));
            }
            this.setState({collecting: false})
        }

        // for(let x = 0; x < this.state.messages.length; x++){
        //     alert(this.state.messages[x])
        // }

        let messages = this.state.messages;

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

    setTitle(e) {
        this.setState({title: e.target.value})
    }

    setMessage(e) {
        this.setState({message: e.target.value})
    }

    addMessage(event) {
        event.preventDefault();

        const form = event.target;
        let data = new FormData(form);
        // data.append('user_id', event.id);
        data.append('body', this.state.title);
        data.append('body_html', this.state.message);

        fetch('http://localhost:5000/profile/add/post/' + this.state.username + '/' + this.state.token, {
            method: 'POST',
            body: data,
        });
    }
}

export default NewsFeedPage