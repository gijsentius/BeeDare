import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import FeedItem from './feedItem';
import Styles from '../styles/feed';
import MainStyles from '../styles';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount(){
        let username = 'james63';
        // console.warn(this.props.navigation.getParam('token'));
        fetch('http://94.212.18.127/profile/newsfeed/' + username + "/" + this.props.navigation.getParam('token'))
            .then(response => response.json())
            .then(data => console.warn(data))
    }

    render() {
        return (
            <View style={MainStyles.container}>

            </View>
        )
    }
}