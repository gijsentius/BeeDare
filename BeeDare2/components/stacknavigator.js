import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Login from "./login";
import TestPage from "./testpage";
import App from "../App";
import Feed from "./feed";

export const StackNav = createStackNavigator({
    Login: {
        screen: Login,
    },
    Feed: {
        screen: Feed,
    },
});