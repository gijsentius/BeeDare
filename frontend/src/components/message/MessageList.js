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
        fetch('http://94.212.18.127/')
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
            items.append(<MessageItem text={} friendsRequest={}/>)
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