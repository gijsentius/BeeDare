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

        let friends_list = [];

        for(let friend in this.state.friends){
            for(let item in friend){
                friends_list.push(item)
            }
        }

        return(
            <Friends friends={friends_list}/>
        )
    }
}

export default FriendPage;