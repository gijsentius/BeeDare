import React, {Component} from 'react';
import Icon from "../icon/Icon";
import '../challenge/Challenge.css';
import {Link} from "react-router-dom";
import {UserContext} from "../UserProvider";

class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: null,
            token: null,
            renderOnce: true,
            owned: this.props.owned
        };
    }

    sayHello(e) {
        e.preventDefault();
        console.log('hello');
    }

    fetchImportant() {
        if (this.state.username) {
            // hier nog graag een API request die alleen op ID haalt, anders beetje zonde van data etc.
            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));

            this.setState({renderOnce: false});
        }
    }

    placeButton() {
        if(this.state.owned){
            return <div className="rightnext">
                <li className="btn-floating btn-small amber darken-1">
                    <Link to="/edit-profile"><i className="material-icons">edit</i></Link>
                </li>
            </div>
        }
    }

    render() {
        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context) => {
                        this.setState({
                            username: context.loggedInUsername,
                            token: context.token
                        });
                        this.fetchImportant();
                    }
                }
                </UserContext.Consumer>
            )
        }

        if (!this.props.profileInfo) {
            return <div/>
        }

        const profile = this.props.profileInfo;

        if (this.state.profileInfo === undefined) {
            return <div/>
        }

        return (
            <div className="card">
                <div className="card-content">
                    <div className="section" key={profile.id}>
                        <div className="center" id='imgCH'>
                            <Icon image={"http://localhost:5000/image/" + this.state.profileInfo.image + "/users"}/>
                            {/*Hierboven nog toevoegen: image={profile.image}*/}
                            {this.placeButton()}
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <h6>{profile.username}</h6>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <a><Link to={"/friends/" + profile.id}><h6>{'Friends'}</h6></Link></a>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <h6>Rank: {this.getRank(profile.score)}</h6>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <h6>Score: {profile.score}</h6>
                    </div>
                </div>
            </div>
        );

    }

    getRank(score){
        if(score < 20){
            return <h6>New Bee</h6>
        }
        else if(score < 50 && score >= 20){
            return <h6>Worker</h6>
        }
        else if(score < 100 && score >= 50){
            return <h6>Warrior</h6>
        }
        else if(score >= 100){
            return <h6>Queen</h6>
        }
    }
}

export default Profile;