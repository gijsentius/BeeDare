import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import DareCard from "./DareCard";
import { CardList } from 'react-native-card-list';


class DareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [],
            cards: []
        }
    }

    componentDidMount() {
        fetch('http://94.212.18.127/dares/')
            .then(response => response.json())
            .then(data => this.setState({challenges: data}))
            .catch(error => console.log(error));
    }

    makeCards(){
        let cards = [];
        for(let challenge in this.state.challenges){
            let card = {
                id: challenge.id + "",
                title: "This is a title",
                //Title Should at least be 7 or 8 characters long! Otherwise it scales like crap
                picture: require('../../images/logo2.png'),
                content:<Text></Text>
        };
            cards.push(card);
        }
        return(cards);
    }

    render() {
        let dares = this.makeCards();
        return (
            <View className="container" style={styles.container}>
                <Text className="title" style={styles.title}>Dares</Text>
                <CardList className="test"  cards={dares}/>
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
    },
    title: {
        fontSize: 20
    },
});


