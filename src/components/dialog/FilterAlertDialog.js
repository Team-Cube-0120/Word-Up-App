import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Input } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

class FilterAlertDialog extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        filterOption: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.radio_props = [
            {label: 'Weather', value: 'Weather'},
            {label: 'Emergency', value: 'Emergency'},
            {label: 'Community Alert', value: 'Community Alert'},
            {label: 'My Alerts', value: 'My Alerts'},



           
        ];

        this.state = {
            selectedValue: this.props.filterOption
        }
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title style={styles.dialogTitle}>Event Type</Dialog.Title>
                    <View>
                        <RadioForm
                            radio_props={this.radio_props}
                            initial={this.props.filterOption}
                            onPress={(value) => this.setState({ selectedValue: value })} />
                    </View>
                    <Dialog.Button label="Close" onPress={() => this.props.onClose()}></Dialog.Button>
                    <Dialog.Button label="Submit" onPress={() => this.props.onSubmit(this.state.selectedValue)}></Dialog.Button>
                </Dialog.Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardView: {
        width: '100%'
    },

    dialogTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    containerView: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: '3%',
        alignItems: 'center',
    },

    containerViewMultiLine: {
        width: '100%',
        marginBottom: '3%',
    },

    title: {
        fontWeight: 'bold',
        marginRight: '1%',
        fontSize: 16
    },

    value: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap'
    },

    buttonView: {
        flexDirection: 'column',
        width: '100%',
        height: 150, // might be a problem for other screens
        justifyContent: 'space-evenly'
    },

    buttonLeft: {

    },

    buttonRight: {
        alignSelf: 'stretch',
    }
});


export default FilterAlertDialog;