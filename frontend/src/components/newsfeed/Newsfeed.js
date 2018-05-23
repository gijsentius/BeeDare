import React, { Component } from 'react';
import Message from './Message'


class Newsfeed extends Component {
  constructor(props){
    super(props);
    this.state={
      messages: []

    }
  }

componentDidMount() {
  fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(data => this.setState({messages: data}))
}


render() {
  let messages = this.state.messages.map((message) =>
        <div className = "message">
          <Message
            body={message.body}
            name={message.name}
          />
        </div>
      ) //end map
      return(
        <div id="messages">
          {messages}
        </div>
      ); //end return
}//end render
}

export default Newsfeed;
