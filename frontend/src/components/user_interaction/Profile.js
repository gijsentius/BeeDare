import React, {Component} from 'react';
import Icon from "../icon/Icon";
import '../challenge/Challenge.css';

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

        let profile;
        if (this.props.profileInfo !== undefined) {
            profile = this.props.profileInfo;
            console.log(profile);
        }

        return (
            <div className="droppedShadowBox">
                <div className="section" key={profile.id}>
                    <div className="center" id='imgCH'>
                        <Icon image={profile.url}/>
                        <div className="rightnext">
                            <a onClick={this.sayHello} className="btn-floating btn-small amber darken-1">
                                <i className="material-icons">edit</i></a>
                        </div>
                    </div>
                </div>
                <div className="divider"/>
                <div className="section center">
                    <h6>{profile.name}</h6>
                </div>
                <div className="divider"/>
                <div className="section center">
                    <a href="#"><h6>{'Friends: ' + profile.phone}</h6></a>
                </div>
                <div className="divider"/>
                <div className="section center">
                    <h6>Rank: Ultimate Master Vegan</h6>
                </div>
            </div>
        );

    }
}

export default Profile;