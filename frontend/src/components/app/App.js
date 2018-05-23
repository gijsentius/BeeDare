import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginRegisterPage from '../user_interaction/login-registerpage';
import ChallengeList from '../challenge/ChallengeList';
import NewsFeedPage from '../newsFeed/NewsFeedPage';
import ProfilePage from '../profile/ProfilePage';
import LandingPage from '../landingPage/LandingPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <div className="nav-wrapper amber darken-1">
                            <Link to="/"><a className="brand-logo">BeeDare</a></Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/challenges">Challenges</Link></li>
                                <li><Link to="/newsfeed">Newsfeed</Link></li>
                                <li><Link to="/account">Account</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="content">
                        <Route exact path="/" component={LandingPage}/>
                        <Route path="/account" component={LoginRegisterPage}/>
						<Route path="/challenges" component={ChallengeList}/>
                        <Route path="/newsfeed" component={NewsFeedPage}/>
                        <Route path="/profile" component={ProfilePage}/>

                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
