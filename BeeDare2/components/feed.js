import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Styles from '../styles/feed';
import MainStyles from '../styles';
import Navbar from "./navbar";

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        // let username = 'james63';
        // fetch('http://94.212.18.127/profile/newsfeed/' + username + "/" + this.props.navigation.getParam('token'))
        //     .then(response => response.json())
        //     .then(data => console.warn(data))
        fetch('https://randomuser.me/api/?seed=1&page=1&results=20')
            .then(response => response.json())
            .then(data => this.setState({data: data.results}))
    }

    render() {
        const list = this.state.data;
        const {navigate} = this.props.navigation;
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Navbar go={navigate} />
            <ScrollView>
                {
                    list.map((item, i) => (
                        <View style={MainStyles.container}>
                            <Text style={MainStyles.bodyText}>{`${item.name.first}`}</Text>
                            <Text style={MainStyles.bodyText}>{`${item.gender}`}</Text>
                            <View  style={[MainStyles.flex, MainStyles.flexRow]}>
                                <TouchableOpacity>
                                    <Text style={[MainStyles.fixRow, MainStyles.niceText]}>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={MainStyles.niceText}>Comment</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            </View>
        )
    }
}