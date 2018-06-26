import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";

class NewsfeedMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {likes : 0};
        this.incrementLikes = this.incrementLikes.bind(this);
        this.reply = this.reply.bind(this);
    }

    incrementLikes(){
        this.setState({likes: this.state.likes+1});
    }

    reply() {
        // TODO: finish this function
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.feed}>
                <Text style={styles.bodyText}>{this.props.name}</Text>
                <Text style={styles.body}>{this.props.body}</Text>
                <View style={styles.cardActions}>
                    <View style={styles.plsfix}>
                    <TouchableOpacity style={styles.actionButton}
                                      onPress={() => this.incrementLikes()}>
                        <Text  style={styles.buttonText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}
                                      onPress={() => this.reply()}>
                        <Text  style={styles.buttonText}>Comment</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </View>
        )
    }
}

export default NewsfeedMessage;

// Dit is de CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    bodyText: {
        color: '#000',
        alignItems: 'center'
    },
    feed: {
        height: 70, // TODO: review this to make it resizable
        alignItems: 'center',
        backgroundColor: '#ffca28'
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    buttonText: {
        color: '#fff'
    },
    actionButton: {
        // height: 30,
        backgroundColor: '#000',
        padding: 5,
        paddingVertical: 5,
        marginHorizontal: 5
    },
    plsfix: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});