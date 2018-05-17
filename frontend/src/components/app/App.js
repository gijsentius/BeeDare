import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginRegisterPage from '../user_interaction/login-registerpage';
import ChallengeList from '../challenge/ChallengeList';
import ChallengeIconBox from '../challenge/ChallengeIconBox';
import NewsFeedPage from "../NewsFeed/NewsFeedPage";

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
                                <li><Link to="/challenge/challengeIconBox">Test</Link></li>
                                <li><Link to="/account">Account</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="content">
                        <Route exact path="/account" component={LoginRegisterPage}/>
						<Route path="/challenges" component={ChallengeList}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
