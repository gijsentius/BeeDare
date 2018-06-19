import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LoginForm from '../../components/LoginScreen/LoginForm'

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../images/logo.png')}/>
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
        backgroundColor: '#fffde7',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    }
});

export default Login
