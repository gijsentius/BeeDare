import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LoginForm from '../../components/LoginScreen/LoginForm';

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../images/logo.png')}/>
                    <Text style={styles.beedareText}>BeeDare</Text>
                    {/*<Text style={styles.beedareText}>Dare yourself to Bee green!</Text>*/}
                </View>

                    <View style={styles.container}>
                        <LoginForm/>
                    </View>
            </View>
        );
    }
}

// Dit is de CSS
const styles = StyleSheet.create({
    container: {
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
    }
});

export default Login
