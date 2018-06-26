import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from "react-native";


class DareCard extends Component {
    constructor(props) {
        super(props);
        this.state = {isExpanded: false,
            isAccepted: false}
        this.handleCollapseInfo = this.handleCollapseInfo.bind(this);
        this.handleExpandInfo = this.handleExpandInfo.bind(this);
        this.acceptDare= this.acceptDare.bind(this);
        this.declineDare= this.declineDare.bind(this);
    } //end constructor

    handleExpandInfo() {
        this.setState({isExpanded: true});
    } //end method

    handleCollapseInfo() {
        this.setState({isExpanded: false});
    } //end method

    acceptDare(){
        this.setState({isAccepted: true});
    }// end method

    declineDare(){
        this.setState({isAccepted: false});
    }//end method

    handleDare(){
        if(this.state.isAccepted){
            return(
                <TouchableOpacity style={styles.button}
                    onPress={() => this.declineDare()}>
                    <Text>Decline dare</Text>
                </TouchableOpacity>)
        } else {
            return(
                <TouchableOpacity style={styles.button}
                    onPress={() => this.acceptDare()}>
                    <Text>Try this dare</Text>
                </TouchableOpacity>
            )
        }
    }


    render(){
        let dareButton = this.handleDare();
        return this.state.isExpanded ? (
            <View className="container" style={styles.container}>
                <View className="contents">
                    <View className="title">
                        <Text className="">TITLE</Text>
                    </View>
                    <View className="description">
                        <Text className="">Description</Text>
                        <Text className="">{this.props.description}</Text>
                    </View>
                    <View className="reward">
                        <Text className="reward-title">Reward</Text>
                        <Text className="reward-text">{this.props.reward}</Text>
                    </View>
                    <View className="buttons">
                        {dareButton}
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.handleCollapseInfo()}>
                            <Text>Read less</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ) : (
            <View className="container" style={styles.container}>
            <View className="contents">
                <View className="title">
                    <Text className="">TITLE</Text>
                </View>
                <View className="buttons">
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.handleExpandInfo()}>
                        <Text>Read more</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        );
    } //end render
} //end class

export default DareCard

// Dit is de CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        //alignItems: 'center'
    },
    button: {
        paddingVertical: 15,
        marginBottom: 10,
        backgroundColor: '#ffca28',
    }
});
