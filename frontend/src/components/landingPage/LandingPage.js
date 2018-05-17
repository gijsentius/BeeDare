import React from 'react';
import Friends from "../friends/Friends";
import NewsFeedPage from "../NewsFeed/NewsFeedPage";
import Newsfeed from "../NewsFeed/Newsfeed";

class LandingPage extends React.Component{
    render(){
        return(
            <div>
                <div className="row"></div>
                <div className="row">
                    <div className="col s6">
                        <h1 className="text">Welcome on the landing page!</h1>
                    </div>
                    <div className="col s6">
                        <h1 className="text">This is an example!</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage