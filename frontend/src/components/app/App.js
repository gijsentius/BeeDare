import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginRegisterPage from '../user_interaction/login-registerpage';
import ChallengeList from '../challenge/ChallengeList';
import NewsFeedPage from '../newsFeed/NewsFeedPage';
import ProfilePage from '../profile/ProfilePage';
import LandingPage from '../landingPage/LandingPage';
import SearchPage from '../search/SearchPage';
import NavLogo from './navbar_icon.png';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <div className="nav-wrapper amber darken-1">
                            <Link to="/">
                                <a class="logo">
                                    <img className="main-logo" src={NavLogo}/>
                                </a>
                                <a>
                                    <span className="navbar-text text-color">BeeDare</span>
                                </a>
                            </Link> 
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/search"><i className="material-icons text-color">search</i></Link></li>
                                <li><Link to="/challenges"><span className="text-color">Dares</span></Link></li>
                                <li><Link to="/newsfeed"><span className="text-color">Newsfeed</span></Link></li>
                                <li><Link to="/account"><span className="text-color">Account</span></Link></li>
                                <li><Link to="/profile"><span className="text-color">Profile</span></Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="content">
                        <Route exact path="/" component={LandingPage}/>
                        <Route path="/account" component={LoginRegisterPage}/>
						<Route path="/challenges" component={ChallengeList}/>
                        <Route path="/newsfeed" component={NewsFeedPage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        <Route path="/search" component={SearchPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
