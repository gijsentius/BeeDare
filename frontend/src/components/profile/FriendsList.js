import React from 'react';
import Block from "../block/Block";
import Icon from "../icon/Icon";
import Link from "react-router-dom/es/Link";
import {UserContext} from "../UserProvider";
import Redirect from "react-router-dom/es/Redirect";

class FriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            token: null,
            renderOnce: true,
            owned: this.props.owned
        }
    }

    fetchImportant() {
        if (this.state.username) {
            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));
            this.setState({renderOnce: false})
        }
    }

    logged(context) {
        this.setState({
            username: context.loggedInUsername,
            token: context.token
        });
        this.fetchImportant();
    }

    render() {
        if (this.state.renderOnce) {
            return (<div>
                    <UserContext.Consumer>{
                        (context => context.isAuthenticated ? this.logged(context) : <Redirect to={{
                            pathname: '/signin',
                        }}/>)
                    }
                    </UserContext.Consumer>
                    <UserContext.Consumer>{
                        (context) => {
                            this.setState({
                                username: context.loggedInUsername,
                                token: context.token,
                            });
                            this.fetchImportant();
                        }
                    }
                    </UserContext.Consumer>
                </div>
            )
        }

        if (!this.state.profileInfo) {
            return (<div/>)
        }

        const members = this.props.members;

        let list = [];
        for (let i = 0; i < members.length; i++) {
            list.push(<div className='item col s4 m3 l2 center'><Link to={"/profile/" + members[i]}>
                <Icon/>{members[i]}
            </Link>
                {this.placeButton(members[i])}
            </div>)
        }
        return <div className='card dare-cols'>
            <div>{list}</div>
        </div>
    }

    placeButton(member) {
        if (this.state.profileInfo.id === parseInt(this.props.user)) {
            return <input className="btn amber darken-1" value='Remove friend' type='button'
                          onClick={() => this.remove_friend(member)}/>
        }
    }

    remove_friend(member) {
        fetch('http://localhost:5000/profile/delete/friend/' + member + '/' + this.state.username + '/' + this.state.token, {
            method: 'GET',
        });
    }
}

export default FriendsList