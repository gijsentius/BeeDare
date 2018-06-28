/**
 * Created by root on 3/25/17.
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        margin: 10,
        backgroundColor: '#ffe082'
    },
    flexEnd: {
        justifyContent: 'flex-end'
    },
    flexRow: {
        flexDirection: 'row'
    },
    flexAround: {
        justifyContent: 'space-around'
    },
    flexBetween: {
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    niceText: {
        color: '#000',
        fontSize: 14
    },
    fixRow: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    bodyText: {
        color: '#000',
        fontSize: 20
    }
})