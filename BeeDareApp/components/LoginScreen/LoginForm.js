import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class LoginForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCorrect={false}
                           keyboardType='email-address'
                           returnKeyType="next"
                           placeholder='Email'
                           placeholderTextColor='#000'/>

                <TextInput style = {styles.input}
                           returnKeyType="go"
                           ref={(input)=> this.passwordInput = input}
                           placeholder='Password'
                           placeholderTextColor='#000'
                           secureTextEntry/>


                <TouchableOpacity style={styles.buttonContainer}>
                                  {/*onPress={onButtonPress}>*/}
                <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// Dit is de CSS
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#000',
        marginBottom: 10,
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: '#ffca28',
        paddingVertical: 15
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default LoginForm
