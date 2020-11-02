
import React, { useState, Component } from 'react';
import { StyleSheet, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Input } from 'react-native-elements';
import UuidGenerator from '../../../util/UuidGenerator';
import PickerExample from './PickerExample';


class CreateAlertsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'N/A',
            severity: 'N/A',
            details: 'N/A',
            location: 'N/A',
            alertType: 'N/A',
            alertId: 'N/A'
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Card>
                    <Card.Title>Create Alert</Card.Title>
                    <Card.Divider />
                    <Text style={styles.text}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Alert Name:"
                        onChangeText={(name) => this.setState({ name: name })}></TextInput>
                    <Text style={styles.text}>Severity</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Severity:"
                        onChangeText={(severity) => this.setState({ severity: severity })}></TextInput>
                    <Text style={styles.text}>Details</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Details:"
                        onChangeText={(details) => this.setState({ details: details })}></TextInput>
                    <Text style={styles.text}>Location</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Location:"
                        onChangeText={(location) => this.setState({ location: location })}></TextInput>
                    <Text style={styles.text}>Choose an Alert Type</Text>
                    <PickerExample 
                        value={this.state.alertType}
                        onSelection={(alertType) => this.setState({ alertType: alertType })}/>

                    <TouchableOpacity style={styles.button}>
                        <Button
                            style={styles.btnText}
                            title="Review"
                            onPress={async () => {
                                this.state.alertId = await UuidGenerator.generateUuid();
                                this.props.navigation.navigate("ReviewAlerts", { alertInfo: this.state })
                            }}></Button>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
        );
    }
}
//use this as reference for edit/confirm screens
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36485f',
        flexDirection: 'column',
        padding: 5,
    },
    space: {
        margin: 10,
    },
    error: {
        color: 'red',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        alignSelf: "center",
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
    },
    button: {

    },
    btnText: {
        color: '#fff',
        fontWeight: "bold"
    },

});

export default CreateAlertsScreen;


