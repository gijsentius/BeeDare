import React, {Component} from 'react';
import Icon from "../icon/Icon";
import '../challenge/Challenge.css';
import {Link} from "react-router-dom";

class HiveProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if (!this.props.profileInfo) {
            return <div/>
        }

        const hive_profile = this.props.profileInfo;

        return (
            <div className="card">
                <div className="card-content">
                    <div className="section" key={hive_profile[0]}>
                        <div className="center" id='imgCH'>
                            <Icon image={hive_profile[2]}/>
                            <div className="rightnext">
                                <li className="btn-floating btn-small amber darken-1">
                                    <Link to="/edit-profile"><i className="material-icons">edit</i></Link></li>
                            </div>
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <h6>{hive_profile[1]}</h6>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <h6>{'Beekeeper: ' + hive_profile[4]}</h6>
                    </div>
                    <div className="divider"/>
                    <div className="section center">
                        <h6>Score: {hive_profile[3]}</h6>
                    </div>
                </div>
            </div>
        );

    }
}

export default HiveProfile;