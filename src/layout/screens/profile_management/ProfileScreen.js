import React, { useState, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class ProfileScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
      }
      
    render() {
        return (
            <View style={styles.container}>
                <Text>HomeScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#fff"

    },
});

export default ProfileScreen;
