import React, {Component} from 'react';
import './Challenge.css'
import {UserContext} from "../UserProvider";
import Redirect from "react-router-dom/es/Redirect";
import Link from "react-router-dom/es/Link";

class ChallengeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            username: null,
            token: null,
            renderOnce: true,
        };
        this.handleCollapseInfo = this.handleCollapseInfo.bind(this);
        this.handleExpandInfo = this.handleExpandInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fetchImportant() {
        if (this.state.username) {
            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data, renderOnce: false}))
                .catch(error => console.log(error));
            this.setState({renderOnce: false});
        }
    }

    handleExpandInfo() {
        this.setState({isExpanded: true});
    }

    handleCollapseInfo() {
        this.setState({isExpanded: false});
    }

    handleClick(event, id) {
        event.preventDefault();

        fetch('http://localhost:5000/dares/accept/' + id + "/" + this.state.username + "/" + this.state.token)
            .then(response => response.json())
            .then(data => this.setState({openChallenges: data}))
            .catch(error => console.log(error));
    }

    logged(context) {
        this.setState({
            username: context.loggedInUsername,
            token: context.token,
            renderOnce: false,
        });
        this.fetchImportant();
    }

    notLogged() {
        return this.state.isExpanded ? (
            <div className="card hoverable" onClick={this.handleCollapseInfo}>
                <div className="card-content">
                    <p className="text center-align"><b>Description</b></p>
                    <p className="text center-align">{this.props.description}</p>
                    <p className="text center-align"><b>Reward</b></p>
                    <p className="text center-align">{this.props.reward}</p>
                    <Link to={"/signin"} className="waves-effect waves-light btn amber darken-1 center-component">Dare</Link>
                </div>
            </div>
        ) : (
            <div className="card hoverable" onClick={this.handleExpandInfo}>
                <div className="card-content">
                    <h6 className="text center-align">{this.props.title}</h6>
                    <img src={this.props.image} alt="" className="circle responsive-img center-component"/>
                </div>
            </div>
        );
    }
    render() {

        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context => context.isAuthenticated ? this.logged(context) : this.notLogged())
                }
                </UserContext.Consumer>
            )
        }

        return this.state.isExpanded ? (
            <div className="card hoverable" onClick={this.handleCollapseInfo}>
                <div className="card-content">
                    <p className="text center-align"><b>Description</b></p>
                    <p className="text center-align">{this.props.description}</p>
                    <p className="text center-align"><b>Reward</b></p>
                    <p className="text center-align">{this.props.reward}</p>
                    <a onClick={(e) => this.handleClick(e, this.props.id)}
                       className="waves-effect waves-light btn amber darken-1 center-component">Dare</a>
                </div>
            </div>
        ) : (
            <div className="card hoverable" onClick={this.handleExpandInfo}>
                <div className="card-content">
                    <h6 className="text center-align">{this.props.title}</h6>
                    <img src={this.props.image} alt="" className="circle responsive-img center-component"/>
                </div>
            </div>
        );
    }
}

export default ChallengeCard;
