import React, {Component} from 'react';
import Icon from "../icon/Icon";
import '../challenge/Challenge.css';
import {Link} from "react-router-dom";

class HiveProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            owned: this.props.owned
        };
    }

    placeButton(hive_profile){
        if(this.state.owned) {
            return <div className="rightnext">
                <li className="btn-floating btn-small amber darken-1">
                    <Link to={"/edit-hive/" + hive_profile[1]}><i
                        className="material-icons">edit</i></Link></li>
            </div>
        }
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
                            <Icon image={'http://localhost:5000/image/' + hive_profile[2] + '/hives'}/>
                            {this.placeButton(hive_profile)}
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