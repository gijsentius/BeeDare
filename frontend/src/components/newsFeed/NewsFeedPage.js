import React from 'react';
import ReactDOM from 'react-dom';
import Hives from "../hives/Hives";
import Hive from "../hives/Hive";
import Profile from "../user_interaction/Profile";
import ScrollEvent from 'react-onscroll';
import Newsfeed from "./Newsfeed";
import './NewsFeed.css';

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: {},
            scrolled: false,
        };
        this.handleScrollCallback = this.handleScrollCallback.bind(this);
        this.clickedBackToTopButton = this.clickedBackToTopButton.bind(this);
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));
    }

    handleScrollCallback() {
        this.setState({
            scrolled: true,
        });
    }

    clickedBackToTopButton() {
        ReactDOM.findDOMNode(this).scrollTop = 0;
        this.setState({
            scrolled: false,
        });
    }

    render() {

        const profileInfo = this.state.profileInfo;
        let scrolled = '';
        if(this.state.scrolled) {
            scrolled = (
                <a 
                    className="waves-effect waves-light btn amber darken-1 center-component top-button" 
                    onClick={this.clickedBackToTopButton}>Top</a>
            );
        } else {
            scrolled = (
                <div>
                </div>
            );
        }
        return (
            <div className="customContainer">
                <div className="row">
                    <ScrollEvent handleScrollCallback={this.handleScrollCallback} />
                    <div className="col s12 m3 sticky">
                        <Profile profileInfo={profileInfo}/>
                        {scrolled}
                    </div>
                    <div className="col s12 m6 card">
                    <div className="card-content">
                        <Newsfeed/>
                    </div>
                    </div>
                    <div className="col s12 m3 card sticky">
                    <div className="card-content">
                        <Hives className="col s4" hives={[<Hive/>, <Hive/>, <Hive/>]}/>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsFeedPage