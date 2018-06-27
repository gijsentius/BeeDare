import React from 'react';

class MessageItem extends React.Component {

    deleteItem() {

    }

    confirmItem() {

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