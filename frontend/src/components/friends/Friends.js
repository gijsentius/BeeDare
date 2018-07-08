import React from "react";
import './Friends.css';
import Icon from "../icon/Icon";
import FriendsList from "../profile/FriendsList";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: props.friends,
        }
    }

    /*componentDidMount() {
        if (this.state.friends === undefined) {
            this.setState({friends: ['no friends']});
        }
    }*/

    render() {
        return (
            <div className='row'>
                <div className="col s12 m12 l12">
                    <h6 className="center">Friends</h6>
                    <FriendsList members={this.props.friends} user={this.props.user}/>
                </div>
            </div>
        );
    }

    getInfo(friend) {
        return {name: friend, online: false, image: undefined};
    }
}

export default Friends;