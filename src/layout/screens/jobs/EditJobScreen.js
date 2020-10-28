import React, { Component } from 'react';
import { View, ScrollView, Button, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import ApiService from '../../../service/api/ApiService';
import RequestOptions from '../../../service/api/RequestOptions';
import SubmissionDialog from '../../../components/dialog/SubmissionDialog';
import { getData, storeData } from '../../../util/LocalStorage';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import ReviewEditJobDialog from '../../../components/dialog/ReviewEditJobDialog';
const sleep = require('../../../util/Thread');

class EditJobScreen extends Component {
    constructor(props) {
        super(props)
        let jobInfo = this.props.route.params.jobInfo;
        this.state = {
            position: jobInfo.position,
            jobType: jobInfo.jobType,
            company: jobInfo.company,
            jobDescription: jobInfo.jobDescription,
            jobAppUrl: jobInfo.jobAppUrl,
            email: jobInfo.email,
            phoneNumber: jobInfo.phoneNumber,
            street: jobInfo.street,
            city: jobInfo.city,
            state: jobInfo.state,
            zip: jobInfo.zip,
            datePosted: new Date().toISOString().slice(0, 10),
            jobId: jobInfo.jobId,
            toggleDialog: false,
            isLoading: false
        }
    }

    editJob() {
        this.setState({ isLoading: true});
        RequestOptions.setUpRequestBody("jobs", this.state.jobId, this.state)
            .then((body) => ApiService.update("data/update", body))
            //.then((response) => sleep(5000))
            .then(() => {
                this.closeDialog();
                this.setState({ isLoading: false })
                this.props.navigation.navigate("Jobs");
                Alert.alert("Congratulations!", "Your job information has been successfully edited!")
            })
            .catch((error) => {
                this.closeDialog();
                this.setState({ isLoading: false })
                Alert.alert("Error", "There was a problem editing your job information. Please try again.")
            })
    }

    closeDialog() {
        this.setState({ toggleDialog: false })
    }

    openDialog() {
        this.setState({ toggleDialog: true })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Card>
                        <Card.Title style={styles.cardTitle}>Edit Job Information</Card.Title>
                        <Text style={styles.instructions}>Please carefully change the fields below.
                            Fields marked with (*) must not be left empty.</Text>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Position: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.position}
                                onChangeText={(position) => this.setState({ position: position })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Job Type: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.jobType}
                                onChangeText={(jobType) => this.setState({ jobType: jobType })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Company: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.company}
                                onChangeText={(company) => this.setState({ company: company })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Job Description: *</Text>
                            <TextInput
                                style={styles.textInputMultipleLine}
                                multiline={true}
                                value={this.state.jobDescription}
                                onChangeText={(jobDescription) => this.setState({ jobDescription: jobDescription })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Job Application URL: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.jobAppUrl}
                                onChangeText={(jobAppUrl) => this.setState({ jobAppUrl: jobAppUrl })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Email: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email: email })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Phone Number: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.phoneNumber}
                                onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Street: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.street}
                                onChangeText={(street) => this.setState({ street: street })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>City: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.city}
                                onChangeText={(city) => this.setState({ city: city })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>State: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.state}
                                onChangeText={(state) => this.setState({ state: state })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Zip: *</Text>
                            <TextInput
                                style={styles.value}
                                value={this.state.zip}
                                onChangeText={(zip) => this.setState({ zip: zip })} />
                        </View>
                        <Card.Divider />
                        <View style={styles.buttonView}>
                            <Button style={styles.buttonLeft}
                                title="Go Back"
                                onPress={() => this.props.navigation.goBack()}></Button>
                            <Button style={styles.buttonRight}
                                title="Review"
                                onPress={() => this.openDialog()}></Button>
                        </View>
                    </Card>
                </ScrollView >
                <ReviewEditJobDialog
                    visible={this.state.toggleDialog}
                    onSubmit={() => this.editJob()}
                    onClose={() => this.closeDialog()}
                    data={this.state}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        width: '100%',
        // flexDirection: 'row',
        marginBottom: '3%'
    },

    cardTitle: {
        textAlign: 'left'
    },

    instructions: {
        marginBottom: '5%'
    },

    title: {
        fontWeight: 'bold',
        marginRight: '1%',
        fontSize: 16
    },

    value: {
        fontSize: 16,
        borderColor: 'gray',
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        padding: '2%'
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


export default EditJobScreen;
