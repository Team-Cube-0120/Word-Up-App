import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Card, Input } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { ALL_TIME, ONE_MONTH, ONE_WEEK, TODAY, TWO_WEEKS, MY_JOBS } from '../../enums/FilterOptionsEnum';
const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class FilterJobDialog extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        filterOption: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.radio_props_date = [
            { label: 'Today', value: TODAY },
            { label: '1 week', value: ONE_WEEK },
            { label: '2 weeks', value: TWO_WEEKS },
            { label: '1 month', value: ONE_MONTH },
            { label: 'All time', value: ALL_TIME },
            { label: 'My Jobs', value: MY_JOBS}
        ];

        this.state = {
            selectedValue: this.props.filterOption
        }
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title style={styles.dialogTitle}>Filter Job Listings</Dialog.Title>

                    <Card>
                        <View>
                            <Text style={styles.dialogSubTitle}>Date</Text>
                            <Card.Divider></Card.Divider>
                            <RadioForm
                                radio_props={this.radio_props_date}
                                initial={this.props.filterOption}
                                animation={true}
                                accessible={true}
                                buttonSize={20}
                                onPress={(value) => this.setState({ selectedValue: value })} />
                        </View>
                    </Card>
                    <Dialog.Button label="Close" color="#006400" onPress={() => this.props.onClose()}></Dialog.Button>
                    <Dialog.Button label="Submit" color="#006400" onPress={() => this.props.onSubmit(this.state.selectedValue)}></Dialog.Button>
                </Dialog.Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardView: {
        width: '100%'
    },

    dialogSubTitle: {
        fontFamily: font,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '5%'
    },

    dialogTitle: {
        fontFamily: font,
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


export default FilterJobDialog;