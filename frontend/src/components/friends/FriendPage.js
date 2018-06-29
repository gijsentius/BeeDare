import React from 'react';
import Friendslist from "./Friendslist";
import Friends from "./Friends";

class FriendPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };
    }

    componentWillMount() {
        fetch('http://localhost:5000/profile/friends/' + this.props.match.params.user)
            .then(response => response.json())
            .then(data => this.setState({friends: data.friends}))
            .catch(error => console.log(error));
    }


    render() {
        if(!this.state.friends){
            return <div/>
        }

        return(
            <Friends friends={this.state.friends}/>
        )
    }
}

export default FriendPage;
