import React, {Component} from 'react';
import {View, Text, ListView, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs2 } from "../router/router";

import actionCreators from '../actions';
import Tabs from 'react-native-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from '../styles/feed';
import MainStyles from '../styles';

class BottomTabs extends Component {

    selectPage(el) {
        this.props.selectPage(el.props.name);
        // Actions[el.props.name];
    }

    render() {
        return (
            <Tabs selected={this.props.page} style={{backgroundColor:'#ffe082'}}
                  selectedStyle={{color:'#333'}} onSelect={this.selectPage.bind(this)}>
                <Icon size={24} name="user" />
                <Icon size={24} name="ellipsis-h" />
            </Tabs>
        )
    }
}
//setState({page:el.props.name})

const mapStateToProps = state => ({
        page: state.page
});

const mapActionsToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(BottomTabs);