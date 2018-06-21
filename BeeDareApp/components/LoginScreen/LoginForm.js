import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import Linking from "react-native";
import LandingScreen from "../../components/LandingScreen/LandingScreen";


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, email: '', password: ''}
    }

    onLogin() {
        alert('Credentials ' + this.state.email + ' ' + this.state.password);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>
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
                                  onPress={() => navigate('LandingScreen')}>
                <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                {/*The hyperlink should work but for some odd reason openURL is not a function for me*/}
                <Text style={styles.bottomLink}
                      onPress={() => Linking.openURL('https://google.com')}>Sign Up for BeeDare
                </Text>
            </View>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginForm;

// CSS
// pls dun change as it finally works perfectly with keyboard avoidance
const styles = StyleSheet.create({
    container: {
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

