import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            password: '',
            email: '',
            username: "",
            isAuthenticated: false,
            token: null};
    }

    handleLogin() {
        const {navigate} = this.props.navigation;
        let formData = new FormData();
        formData.append('password', this.state.password);
        formData.append('email', this.state.email);
        fetch('http://94.212.18.127/auth/login',{
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => this.setState({isAuthenticated:data['login'],
            username:data['username'],
            token: data['token']}));
        // if(this.state.token) {
            navigate('Feed', {
                token: this.state.token,
                username: this.state.username
            })
        // }
    }

    render() {
        return (
            <View style={styles.container1}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../images/logo.png')}/>
                    <Text style={styles.beedareText}>BeeDare</Text>
                    {/*<Text style={styles.beedareText}>Dare yourself to Bee green!</Text>*/}
                </View>
                <KeyboardAvoidingView style={styles.container2} behavior="padding" enabled>
                    <View style={styles.container2}>
                        <TextInput style = {styles.input}
                                   onChangeText={(email) => this.setState({ email })}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   keyboardType='email-address'
                                   returnKeyType="next"
                                   placeholder='Email'
                                   placeholderTextColor='#000'/>

                        <TextInput style = {styles.input}
                                   onChangeText={(password) => this.setState({ password })}
                                   returnKeyType="go"
                                   placeholder='Password'
                                   placeholderTextColor='#000'
                                   secureTextEntry/>

                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => this.handleLogin()}>
                            <Text  style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomLink}>Sign Up for BeeDare</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default Login;

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


