import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={() =>this.props.go('Feed')}>
                    <Text style={styles.buttonContainer}>Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={()=>this.props.go('Profile')}>
                    <Text style={styles.buttonContainer}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonContainer}>Test3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonContainer}>Test4</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f8f9f9',
        justifyContent: 'center',
        height: 40
    }
});