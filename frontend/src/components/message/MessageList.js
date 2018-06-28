import React from 'react';
import MessageItem from './MessageItem';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: null,
            token: null,
            renderOnce: true,
        };
    }

    fetchImportant() {
        fetch('http://94.212.18.127/profile/messages' + this.state.username + "/" + this.state.token)
            .then(response => response.json())
            .then(data => this.setState({messages: data}))
            .catch(error => console.log(error));
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
        let items = []
        for (message in messages) {
            let item = message.
            items.append(
                <MessageItem  
                    id={message.id} 
                    text={message.title} 
                    friendsRequest={message.friendsRequest}
                    sender={message.sender}
                    user={this.state.username}
                    token={this.state.token}
                />
            )
        }
        return (
            <ul class="collection with-header">
                <li class="collection-header"><h4>Messages</h4></li>
                {items}
            </ul>
        )
    }
}

export default MessageList;