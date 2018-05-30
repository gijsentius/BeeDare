import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginPage from '../user_interaction/login_page';
import RegisterPage from '../user_interaction/register_page';
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
                                    <span className="navbar-text">BeeDare</span>
                                </a>
                            </Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/search"><i className="material-icons">search</i></Link></li>
                                <li><Link to="/challenges">Dares</Link></li>
                                <li><Link to="/newsfeed">Newsfeed</Link></li>
                                <li><Link to="/signin">Sign in</Link></li>
                                <li><Link to="/signup">Get started</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="content">
                        <Route exact path="/" component={LandingPage}/>
                        <Route path="/signin" component={LoginPage}/>
                        <Route path="/signup" component={RegisterPage}/>
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
