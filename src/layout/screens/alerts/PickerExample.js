
import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

class PickerExample extends Component {
    static propTypes = {
        value: PropTypes.string,
        onSelection: PropTypes.func
    }

    render() {
        return (
            <View>
                <Picker selectedValue={this.props.value}
                    style={styles.picker}
                    onValueChange={(itemValue, itemPosition) => this.props.onSelection(itemValue)} >
                    <Picker.Item label="N/A" value="N/A" />
                    <Picker.Item label="Weather" value="Weather" />
                    <Picker.Item label="Emergency" value="Emergency" />
                    <Picker.Item label="Community Alert" value="Community Alert" />
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
    picker: {
        height: 40,
        marginBottom: 30,
        color: 'gray',
        borderColor: 'gray',
        borderWidth: 1,
    },
})