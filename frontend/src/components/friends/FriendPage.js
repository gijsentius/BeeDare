import React from 'react';
import Friendslist from "./Friendslist";
import Friends from "./Friends";

class FriendPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            images: [],
        };
    }

    componentWillMount() {
        fetch('http://localhost:5000/profile/friends/' + this.props.match.params.user)
            .then(response => response.json())
            .then(data => this.setState({friends: data.friends, images: data.friend_image}))
            .catch(error => console.log(error));
    }


    render() {
        if(this.state.friends.length === 0){
            return <h6 className='center'>{"There are no friends yet!"}</h6>
        }
        else{
            return(
                <Friends friends={this.state.friends} images={this.state.images} user={this.props.match.params.user}/>
            )
        }
    }
}

export default FriendPage;
