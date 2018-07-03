import React, {Component} from 'react';
import Message from './Message'
import Icon from "../icon/Icon";


class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            number: 10,
            messageList: [],

        }
    }

    // componentDidMount() {
    //     let username = 'Vyxor';
    //     fetch('http://localhost:5000/profile/newsfeed/' + username)
    //         .then(response => response.json())
    //         .then(data => this.setState({messages: data}));
    // }


    render() {
        // let list = [];
        // for (let message in this.props.messages) {
        //     console.log(this.props.messages);
        //     list.push(<div className="message">
        //         <Message
        //             body={'test'}
        //             name={'test2'}
        //         />
        //     </div>)
        // }
        this.state.messageList = this.props.messages.map((message) =>
            <div className="message">
                <Message
                    body={message.body_html}
                    name={message.body}
                    author={message.author}
                />
            </div>
        );//end map
        return (
            <div>
                {this.getList(this.state.number)}
                {this.placeButton()}
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

    placeButton() {
        if (this.state.number < this.state.messages.length) {
            return <a className="waves-effect waves-light btn amber darken-1 center-component top-button"
                      onClick={() => this.setState({number: this.state.number + 10})}>Load more</a>
        }
    }
}

export default Newsfeed;
