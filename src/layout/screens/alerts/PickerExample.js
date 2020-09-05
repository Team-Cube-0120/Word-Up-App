
import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class PickerExample extends Component {
    state = {user: ''}
    updateUser = (user) => {
    this.setState({ user: user })
   }
   render() {
        return (
        <View>
                <Picker selectedValue = {this.state.user} 
                        style = {styles.picker}
                        onValueChange = {this.updateUser}>
                    <Picker.Item label="Weather" value="Default" />
                    <Picker.Item label="Emergency" value="Outdoor" />
                </Picker>
            </View>
        )
    }
}

 
export default PickerExample;

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker:{
    height: 40,
    marginBottom: 30,
    color: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    },
})