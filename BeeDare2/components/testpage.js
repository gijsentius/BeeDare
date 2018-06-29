import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';

class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, password: '', email: ''};
    }

    handleLogin() {
        let formData = new FormData();
        formData.append('password', this.state.password);
        formData.append('email', this.state.email);
        fetch('http://localhost:5000/auth/login',{
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.warn(data))
    }

    render() {
        return (
            <View style={styles.container1}>
                <Text>
                    Gijs houdt van BBCs
                </Text>
            </View>
        );
    }
}

export default TestPage;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe082',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 100
    },
    beedareText: {
        fontSize: 25,
        fontStyle: 'normal',
        color: '#000',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        width: 250,
        marginBottom: 40,
        marginTop: 40,
        // backgroundColor: '#000'
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        marginBottom: 10,
        color: '#000',
    },
    buttonContainer: {
        backgroundColor: '#ffca28',
        paddingVertical: 15,
        marginBottom: 10
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '700'
    },
    bottomLink: {
        textAlign:'center',
        color: '#000',
        marginBottom: 5,
        marginTop: 5,
        textDecorationLine: 'underline'
    }
});


