import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import {Tabs} from "./components/router";
import {StackNav} from "./components/stacknavigator";


export default class App extends Component {
  render() {
    return (
        <StackNav/>
    )
  }
}

AppRegistry.registerComponent('BeeDare2', () => App);