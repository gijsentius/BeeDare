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
import ChangeEmailPassword from "../editInformation/ChangeEmailPassword";
import EditProfilePage from "../editInformation/EditProfilePage";



class App extends Component {

    constructor(props){
        super(props);
        this.state = {loginState: true};
    }

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <div className="nav-wrapper #ffd54f amber lighten-1">
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
                                {this.returnCorrectPath()}
                            </ul>
                        </div>
                    </nav>
                    <div className="content">
                        <Route path="/signin" component={LoginPage}/>
                        <Route path="/signup" component={RegisterPage}/>
						            <Route path="/challenges" component={ChallengeList}/>
                        <Route path="/newsfeed" component={NewsFeedPage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/change-email" component={ChangeEmailPassword}/>
                        <Route path="/edit-profile" component={EditProfilePage}/>
                    </div>
                    <div>
                        <Route exact path="/" component={LandingPage}/>
                    </div>
                </div>
            </Router>
        );
    }

    // a small function to update de state of the user us in
    updateState() {
        this.setState({loginState: !this.state.loginState});
    }

    // a small component to return the correct pages
    returnCorrectPath(){
        if (this.state.loginState){
            // thanks to React.Fragment you can return multiple elements without using a div
            return <React.Fragment>
                <li><Link to="/newsfeed"><span className="text-color">Newsfeed</span></Link></li>
                <li><Link to="/profile"><span className="text-color">Profile</span></Link></li>
                </React.Fragment>

        } else{
            return<React.Fragment>
                <li><Link to="/signin"><span className="text-color">Sign In</span></Link></li>
                <li><Link to="/signup"><span className="text-color">Get Started</span></Link></li>
            </React.Fragment>
        }
    }

}

export default App;
