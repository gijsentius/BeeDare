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
        fetch('http://localhost:5000/profile/user')
            .then(response => response.json())
            .then(data => this.setState({friends: data}))
            .catch(error => console.log(error));
    }


    render() {
        if(!this.state.friends){
            return <div/>
        }

        let friends = this.state.friends;

        return(
            <Friends friends={friends}/>
        )
    }
}

export default FriendPage;