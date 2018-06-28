import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('http://94.212.18.127/profile/user)
    }
}