import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import ApiService from '../../../service/api/ApiService';
import RequestOptions from '../../../service/api/RequestOptions';
import SubmissionDialog from '../../../components/dialog/SubmissionDialog';
const sleep = require('../../../util/Thread');


class ReviewJobScreen extends Component {
    constructor(props) {
        super(props);
        this.jobInfo = this.props.route.params.jobInfo;
        this.state = {
            isLoading: false,
            toggleDialog: false,
            title: '',
            addJobResponse: ' ',
            isResponseError: false
        };
    }

    async addJob() {
        this.setState({ isLoading: true });
        RequestOptions.setUpRequestBody("jobs", this.jobInfo)
            .then((body) => ApiService.post('data/add', body))
            .then((response) => this.setState({
                title: 'Congratulations',
                addJobResponse: 'Your job has been successfully posted!'
            }))
            .catch((error) => this.setState({
                isResponseError: true,
                title: 'Oops!',
                addJobResponse: 'There was a problem adding your job information. Please try again.'
            }))
            .then(() => sleep(5000))
            .then(() => this.openDialog())
    }

    openDialog() {
        this.setState({ isLoading: false });
        this.setState({ toggleDialog: true });
    }

    closeDialog() {
        this.setState({ toggleDialog: false });
        if (!this.state.isResponseError) {
            this.props.navigation.navigate("Jobs");
        }
        this.setState({ isResponseError: false });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Card>
                        <Card.Title>Review Job Information</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Position: </Text>
                            <Text style={styles.value}>{this.jobInfo.position}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Job Type: </Text>
                            <Text style={styles.value}>{this.jobInfo.jobType}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Company: </Text>
                            <Text style={styles.value}>{this.jobInfo.company}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Job Description: </Text>
                            <Text style={styles.value}>{this.jobInfo.jobDescription}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Job Application URL: </Text>
                            <Text style={styles.value}>{this.jobInfo.jobAppUrl}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Email: </Text>
                            <Text style={styles.value}>{this.jobInfo.email}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Phone Number: </Text>
                            <Text style={styles.value}>{this.jobInfo.phoneNumber}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Street: </Text>
                            <Text style={styles.value}>{this.jobInfo.street}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>City: </Text>
                            <Text style={styles.value}>{this.jobInfo.city}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>State: </Text>
                            <Text style={styles.value}>{this.jobInfo.state}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Zip: </Text>
                            <Text style={styles.value}>{this.jobInfo.zip}</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <Button style={styles.buttonLeft}
                                title="Go Back"
                                onPress={() => this.props.navigation.goBack()}></Button>
                            <Button style={styles.buttonRight}
                                title="Submit"
                                onPress={() => this.addJob()}></Button>
                        </View>
                        <ActivityIndicator animating={this.state.isLoading} />
                    </Card>
                </ScrollView >
                <SubmissionDialog
                    visible={this.state.toggleDialog}
                    onClose={() => this.closeDialog()}
                    text={this.state.addJobResponse}
                    title={this.state.title} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: '3%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: '6%',
        paddingBottom: '1%',
        paddingLeft: '3%'
    },

    title: {
        fontWeight: 'bold',
        marginRight: '1%',
        fontSize: 16
    },

    value: {
        fontSize: 16
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

export default ReviewJobScreen;