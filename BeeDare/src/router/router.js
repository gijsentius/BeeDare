import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Login from '../components/login';
import TestPage from '../components/testpage';

export const Tabs = TabNavigator({
    Login: {
        screen: Login,
    },
    TestPage: {
        screen: TestPage,
    },
});