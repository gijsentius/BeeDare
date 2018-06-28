import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import {StackNav} from "./components/stacknavigator";
import Navbar from "./components/navbar";


export default class App extends Component {
  render() {
    return (
        <StackNav/>
    )
  }
}

AppRegistry.registerComponent('BeeDare2', () => App);