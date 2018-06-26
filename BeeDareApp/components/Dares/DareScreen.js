import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import DareCard from "./DareCard";
import { CardList } from 'react-native-card-list';


class DareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [],
        }
    }

    componentDidMount() {
        fetch('http://94.212.18.127:5000/dares/')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error));
    }

    render() {
        let challenges = this.state.challenges.map((challenge) =>
            [
                {
                    id: "0",
                    title: "Starry Night",
                    picture: require('../../images/logo.png'),
                    content: <Text>Starry Night</Text>

                }
            ]
        );

        return (
            <View className="container" style={styles.container}>
                <CardList cards={challenges}/>
            </View>
        );
    }
}

export default DareScreen;

// Dit is de CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe082',
    }
});


