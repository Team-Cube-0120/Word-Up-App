import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { Card, Input } from 'react-native-elements';


class CreateJobScreen extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <Card>
                        <Card.Title>New Job Listing</Card.Title>
                        <Card.Divider />
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Position</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Software Engineer" />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Company</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Google" />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Job Description</Text>
                            <TextInput
                                style={styles.textInputMultipleLine}
                                placeholder="e.g. Role, Minimum Requirements, Preferences"
                                multiline={true}
                            />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Street</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. 1234 Honeywell Lane" />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>City</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Hampton" />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>State</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Virginia" />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Zip</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. 12345" />
                        </View>
                        <Button title="Submit"></Button>
                    </Card>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        height: 40
    },

    textInputMultipleLine: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        height: 150,
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingBottom: 10
    },

    text: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    },

    viewItem: {
        width: '100%',
        marginBottom: '5%'
    }
})

export default CreateJobScreen;