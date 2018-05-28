import React from "react";
import './Friends.css';
import Icon from "../icon/Icon";

class Friendslist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: props.friends,
        }
    }

    componentDidMount() {
        if (this.state.friends === undefined) {
            this.setState({friends: ['No friends']});
        }
    }

    render() {
        let list = [];
        if (this.state.friends !== undefined) {
            for (let i = 0; i < this.state.friends.length; i++) {
                let info = this.getInfo(this.state.friends[i]);
                list.push(<Icon key={i} action={() => alert(info.name)} online={info.online} image={info.image} />);
            }
        }
        return (
            <div className='friendsList1'>
                <h5 className='text'> Friends </h5>
                <div className='friends1'>{list}</div>
            </div>
        )
    }

    getInfo(friend) {
        return {name: friend, online: false, image: undefined};
    }
}

export default Friendslist;