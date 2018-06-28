import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import {Tabs} from "./components/router";


export default class App extends Component {
  render() {
    return (
        <Tabs/>
    )
  }
}

AppRegistry.registerComponent('BeeDare2', () => App);