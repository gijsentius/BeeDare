import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width,
        paddingHorizontal: 20,
        flexShrink: 0,
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width,
        borderTopWidth: 2,
        borderColor: '#828282',
        paddingBottom: 20,
        backgroundColor: '#ffe082',
        borderBottomWidth : 1
    },
    content: {
        flex: 4,
        width,

    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000',
    },
    feedMessage: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginTop: 10,
        color: '#000',
        fontSize: 16,
    },
    messageButton: {
        borderLeftWidth: 1,
        borderColor: '#969696',
    },
    feedUsername: {
        fontSize: 22,
        color: '#000',
    },
    bottomTab: {
        color: '#000',
        backgroundColor: '#ffe082'
    }
})