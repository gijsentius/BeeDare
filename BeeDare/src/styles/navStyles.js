/**
 * Created by root on 3/25/17.
 */
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    navBar: {
        backgroundColor: '#ffe082'
    },
    navBarTitle:{
        color:'#000'
    },
    barButtonTextStyle:{
        color:'#fff'
    },
    barButtonIconStyle:{
        tintColor:'#000'
    }
})