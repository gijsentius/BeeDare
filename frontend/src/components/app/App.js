import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
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
import EditHivePage from "../editInformation/EditHivePage";
import FriendPage from "../friends/FriendPage";
import UserProvider from "../UserProvider"
import {UserContext} from "../UserProvider";
import HivesPage from "../hives/HivesPage";
import HivePage from "../profile/HivePage";
// Idea/ source for PrivateRouter from https://tylermcginnis.com/react-router-protected-routes-authentication/


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        <UserContext.Consumer>
            {(context => context.isAuthenticated ?
                <Component {...props} />
                : <Redirect to={{
                    pathname: '/signin',
                    state: {from: props.location}
                }}/>)
            }
        </UserContext.Consumer>
    )}/>
);


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UserProvider>
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
                                    <li><Link to="/challenges"><span className="text-color">Dares</span></Link></li>
                                    <li><Link to="/hives"><span className="text-color">Hives</span></Link></li>
                                    {App.returnCorrectPath()}
                                    <li><Link to="/search"><i className="material-icons text-color">search</i></Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="content">
                            <Route path="/signin" component={LoginPage}/>
                            <Route path="/signup" component={RegisterPage}/>
                            <Route path="/challenges" component={ChallengeList}/>
                            <PrivateRoute path="/newsfeed" component={NewsFeedPage}/>
                            <PrivateRoute path="/profile/:user" component={ProfilePage}/>
                            <Route path="/search" component={SearchPage}/>
                            <PrivateRoute path="/change-email" component={ChangeEmailPassword}/>
                            <PrivateRoute path="/edit-profile" component={EditProfilePage}/>
                            <PrivateRoute path="/edit-hive/:name" component={EditHivePage}/>
                            <Route path="/friends/:user" component={FriendPage}/>
                            <Route path="/hives" component={HivesPage}/>
                            <Route path="/hive/:name" component={HivePage}/>
                        </div>
                        <div>
                            <Route exact path="/" component={LandingPage}/>
                        </div>

                    </div>
                </Router>
            </UserProvider>
        );
    }

    // a small component to return the correct pages
    static returnCorrectPath() {
        return (
            <UserContext.Consumer>
                {(context => context.isAuthenticated ?
                    <React.Fragment>
                        <li><Link to="/newsfeed"><span className="text-color">Newsfeed</span></Link></li>
                        <li><Link to={"/profile/" + context.loggedInUsername}><span className="text-color">Profile</span></Link></li>
                        <li onClick={context.signout}><Link to="/signin"><span className="text-color">
                            Sign out</span></Link></li>
                    </React.Fragment>
                    : <React.Fragment>
                        <li><Link to="/signin"><span className="text-color">Sign In</span></Link></li>
                        <li><Link to="/signup"><span className="text-color">Get Started</span></Link></li>
                    </React.Fragment>)
                }
            </UserContext.Consumer>
        )
    }
}

export default App;
