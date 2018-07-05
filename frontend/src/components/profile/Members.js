import React from 'react';
import Block from "../block/Block";
import Icon from "../icon/Icon";
import Link from "react-router-dom/es/Link";
import {UserContext} from "../UserProvider";

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            token: null,
            renderOnce: true,
        }
    }

    fetchImportant() {
        if (this.state.username) {
            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));
        }
    }

    render() {
        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context) => {
                        this.setState({
                            username: context.loggedInUsername,
                            token: context.token,
                            renderOnce: false
                        });
                        this.fetchImportant();
                    }
                }
                </UserContext.Consumer>
            )
        }

        const members = this.props.members;

        let list = [];
        for (let i = 0; i < members.length; i++) {
            list.push(<div className='item col s4 m3 l2 center'><Link to={"/profile/" + members[i]}>
                <Icon/>{members[i]}
            </Link>
                <input className="btn amber darken-1" value='Remove friend' type='button'
                       onClick={() => this.remove_friend(members[i])}/>
            </div>)
        }
        return <div className='card'>
            {list}
        </div>
    }

    remove_friend(member) {
        fetch('http://localhost:5000/profile/delete/friend/' + member + '/' + this.state.username + '/' + this.state.token, {
            method: 'GET',
        });
    }
}

export default Members