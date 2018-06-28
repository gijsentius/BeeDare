import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from "../router/router";

import actionCreators from '../actions';

import MainStyles from '../styles';
import Feed from '../components/feed';
import BottomTabs from '../components/bottomTabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import data from '../data/users';
import Login from "../components/login";
class Home extends Component {
    
    render() {
        return (
            <Tabs/>
        )
    }
}

// dit is nodig lol
const mapStateToProps = state => ({

});

const mapActionsToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(Home);
