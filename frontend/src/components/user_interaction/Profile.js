import React, {Component} from 'react';
import Icon from "../icon/Icon";
import '../challenge/Challenge.css';
import {Link} from "react-router-dom";

class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    sayHello(e) {
        e.preventDefault();
        console.log('hello');
    }

    render() {

        if (!this.props.profileInfo) {
            return <div/>
        }

        const profile = this.props.profileInfo;

        return (
            <div className="card">
            <div className="card-content">
                <div className="section" key={profile.id}>
                    <div className="center" id='imgCH'>
                        <Icon />
                        {/*Hierboven nog toevoegen: image={profile.image}*/}
                        <div className="rightnext">
                            <li className="btn-floating btn-small amber darken-1">
                                <Link to="/edit-profile"><i className="material-icons">edit</i></Link></li>
                        </div>
                    </div>
                </div>
                <div className="divider"/>
                <div className="section center">
                    <h6>{profile.username}</h6>
                </div>
                <div className="divider"/>
                <div className="section center">
                    <a href="#"><h6>{'Friends: ' + profile.id}</h6></a>
                </div>
                <div className="divider"/>
                <div className="section center">
                    <h6>Rank: {profile.rank}</h6>
                </div>
            </div>
            </div>
        );

    }
}

export default Profile;