import React, {Component} from 'react';
import './Message.css'

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
        };
        this.incrementLikes = this.incrementLikes.bind(this);
        this.reply = this.reply.bind(this);
    }

    incrementLikes() {
        this.setState({likes: this.state.likes + 1});
    }

    reply() {

    }

    //TODO: Add DATE in messages. Maybe avatar too?
    render() {
        return (
            <div className="section center">
                <div className="messageCard">
                    <div className="card amber lighten-1">
                        <span className="username">{this.props.name}</span>
                        <div className="body">
                            {this.props.body}
                        </div>
                        <div className="body">
                            {this.props.author}
                        </div>

                        <div className="card-action">
                            <div id="center-content">
                                <button id="link-pointer" onClick={this.incrementLikes}><i
                                    className="material-icons text-hover">thumb_up</i></button>
                                <button id="link-pointer" onClick={this.reply}><i
                                    className="material-icons text-hover">reply</i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;
