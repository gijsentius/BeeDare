import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:this.props.username
        }
    }
}