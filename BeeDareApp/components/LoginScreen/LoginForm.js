import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

class LoginForm extends Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
            </KeyboardAvoidingView>
        );
    }
}

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
    }
});

export default LoginForm
