import React, { Component } from 'react';
// message importeren hier

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
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => this.setState({messages: data}))
    }

    render() {
        this.state.messageList = this.state.messages.map((message) =>
        )
    }
}