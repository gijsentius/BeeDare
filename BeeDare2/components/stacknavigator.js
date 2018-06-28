import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Login from "./login";
import TestPage from "./testpage";
import App from "../App";
import Feed from "./feed";
import {Button} from "react-native";
import Profile from "./profile";

export const StackNav = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#ffe082'
            }
        }
    },
    Feed: {
        screen: Feed,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#ffe082'
            }
        }
    },
    TestPage: {
        screen: TestPage,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#ffe082'
            }
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#ffe082'
            }
        }
    }
});