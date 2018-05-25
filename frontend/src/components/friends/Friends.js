import React from "react";
import './Friends.css';
import Icon from "../icon/Icon";

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
        let list = [];

        this.props.friends.forEach((friend) => {
            list.push(
                <Icon image={friend.url} action={() => alert(friend.name)}/>
            )
        });
        return (
            <div className="droppedShadowBox col s12">
                <div className="friends">{<div className="col s6 m4 l1">{list}</div>}</div>
            </div>
        );
    }

    getInfo(friend) {
        return {name: friend, online: false, image: undefined};
    }
}

export default Friends;