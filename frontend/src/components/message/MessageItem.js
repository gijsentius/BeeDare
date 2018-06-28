import React from 'react';

class MessageItem extends React.Component {

    deleteItem() {
        fetch('http://94.212.18.127/profile/delete/message/' + "/" + this.props.id + "/" + this.props.username + "/" + this.props.token)
            .then(response => response.json())
            .catch(error => console.log(error));
        this.props.refresh();
    }

    confirmItem() {
        fetch('http://94.212.18.127/profile/accept/friend/' + this.props.friendsRequest + "/" + this.props.username + "/" + this.props.token)
            .then(response => response.json())
            .catch(error => console.log(error));
        fetch('http://94.212.18.127/profile/delete/message/' + "/" + this.props.id + "/" + this.props.username + "/" + this.props.token)
            .then(response => response.json())
            .catch(error => console.log(error));
        this.props.refresh();
    }

    render() {
        return this.props.friendsRequest ? (
            <li className="collection-item">
                <div>
                    {this.props.text}
                    <a onChange={this.confirmItem} class="secondary-content"><i class="material-icons">done</i></a>
                    <a onChange={this.deleteItem} class="secondary-content"><i class="material-icons">clear</i></a>
                </div>
            </li>
        ) : (
            <li className="collection-item">
                <div>
                    {this.props.text}
                    <a onChange={this.deleteItem} class="secondary-content"><i class="material-icons">clear</i></a>
                </div>
            </li>
        )
    }
}

export default MessageItem;