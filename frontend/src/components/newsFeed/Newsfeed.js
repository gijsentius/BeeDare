import React, {Component} from 'react';
import Message from './Message'
import scrollToComponent from "react-scroll-to-component";


class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            number: 10,
            messageList: [],

        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/profile/newsfeed/' + username)
            .then(response => response.json())
            .then(data => this.setState({messages: data}));
    }


    render() {
        this.state.messageList = this.state.messages.map((message) =>
            <div className="message">
                <Message
                    body={message.body}
                    name={message.author}
                />
            </div>
        );//end map
        return (
            <div>
                {this.getList(this.state.number)}
                <a className="waves-effect waves-light btn amber darken-1 center-component top-button"
                    onClick={() => this.setState({number: this.state.number + 10})}>Load more</a>
            </div>

        ); //end return
    }//end render

    getList() {
        let messageSet = [];
        for (let i = 0; i < this.state.number; i++) {
            messageSet.push(this.state.messageList[i])
        }
        return (
            <div className="card">
                <div className="card-content">
                    {messageSet}
                </div>
            </div>
        )
    }
}

export default Newsfeed;
