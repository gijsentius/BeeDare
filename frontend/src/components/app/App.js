import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginRegisterPage from '../user_interaction/login-registerpage';
import HiveMembers from "../hives/HiveMembers";
import Icon from "../icon/Icon";
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
                                <li><Link to="/">Sass</Link></li>
                                <li><Link to="/">Components</Link></li>
                                <li><Link to="/">JavaScript</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="content">
                        <Route exact path="/" component={NewsFeedPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
