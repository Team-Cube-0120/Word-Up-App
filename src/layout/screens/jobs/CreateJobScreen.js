import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';


class CreateJobScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 'NA',
            jobType: 'NA',
            company: 'NA',
            jobDescription: 'NA',
            jobAppUrl: 'NA',
            email: 'NA',
            phoneNumber: 'NA',
            street: 'NA',
            city: 'NA',
            state: 'NA',
            zip: 'NA',
            datePosted: new Date().toISOString().slice(0,10)
        }
    }
    render() {
        return (
            <View>
                <ScrollView style = {styles.container}>
                    <Card>
                        <Card.Title>New Job Listing</Card.Title>
                        <Card.Divider />
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Position</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Software Engineer"
                                onChangeText={(position) => this.setState({ position: position })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Job Type</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Full-time, Part-time, etc."
                                onChangeText={(jobType) => this.setState({ jobType: jobType })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Company</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Google"
                                onChangeText={(company) => this.setState({ company: company })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Job Description</Text>
                            <TextInput
                                style={styles.textInputMultipleLine}
                                placeholder="e.g. Role, Minimum Requirements, Preferences"
                                multiline={true}
                                onChangeText={(jobDescription) => this.setState({ jobDescription: jobDescription })}
                            />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Job Application URL</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. http://google.com/careers/<job-id>"
                                onChangeText={(jobAppUrl) => this.setState({ jobAppUrl: jobAppUrl })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. John.Doe@gmail.com"
                                onChangeText={(email) => this.setState({ email: email })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Phone Number</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. 123-456-7890"
                                onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber })}
                            />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Job Application URL</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. http://google.com/careers/<job-id>"
                                onChangeText={(jobAppUrl) => this.setState({ jobAppUrl: jobAppUrl })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Street</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. 1234 Honeywell Lane"
                                onChangeText={(street) => this.setState({ street: street })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>City</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Hampton"
                                onChangeText={(city) => this.setState({ city: city })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>State</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Virginia"
                                onChangeText={(state) => this.setState({ state: state })} />
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.text}>Zip</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. 12345"
                                onChangeText={(zip) => this.setState({ zip: zip })} />
                        </View>
                        <TouchableHighlight>
                            <Button
                                title="Review"
                                onPress={() => this.props.navigation.push('ReviewJobs', { jobInfo: this.state })}
                            ></Button>
                        </TouchableHighlight>
                    </Card>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {  
        backgroundColor: '#36485f',
        flexDirection: 'column',
        padding: 5,    
    },  
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
        height: 40,
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
        marginBottom: 7,
        fontWeight: 'bold'
    },

    viewItem: {
        width: '100%',
        marginBottom: 10,
        }
})

export default CreateJobScreen;