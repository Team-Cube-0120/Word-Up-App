import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import ApiService from '../../../service/api/ApiService';
import RequestOptions from '../../../service/api/RequestOptions';
import SubmissionDialog from '../../../components/dialog/SubmissionDialog';
const sleep = require('../../../util/Thread');

class ReviewAlertsScreen extends Component {
    constructor(props) {
        super(props);
        this.alertInfo = this.props.route.params.alertInfo;
        this.state = {
            isLoading: false,
            toggleDialog: false,
            title: '',
            addAlertResponse: ' ',
            isResponseError: false
        };
    }

    async addAlert() {
        this.setState({ isLoading: true });
        RequestOptions.setUpRequestBody("alerts", this.alertInfo.alertId, this.alertInfo)
            .then((body) => ApiService.post('data/add', body))
            .then((response) => this.setState({
                title: 'Congratulations',
                addAlertResponse: 'Your alert has been successfully posted!'
            }))
            .catch((error) => this.setState({
                isResponseError: true,
                title: 'Oops!',
                addAlertResponse: 'There was a problem adding your alert information. Please try again.'
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
            this.props.navigation.navigate("Alerts");
        }
        this.setState({ isResponseError: false });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Card>
                        <Card.Title>Review Alerts Information</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Name: </Text>
                            <Text style={styles.value}>{this.alertInfo.name}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Severity: </Text>
                            <Text style={styles.value}>{this.alertInfo.severity}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Details: </Text>
                            <Text style={styles.value}>{this.alertInfo.details}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Location: </Text>
                            <Text style={styles.value}>{this.alertInfo.location}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Alert Type: </Text>
                            <Text style={styles.value}>{this.alertInfo.alertType}</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <Button style={styles.buttonLeft}
                                title="Go Back"
                                onPress={() => this.props.navigation.goBack()}></Button>
                            <Button style={styles.buttonRight}
                                title="Submit"
                                onPress={() => this.addAlert()}></Button>
                        </View>
                        <ActivityIndicator animating={this.state.isLoading} />
                    </Card>
                </ScrollView >
                <SubmissionDialog
                    visible={this.state.toggleDialog}
                    onClose={() => this.closeDialog()}
                    text={this.state.addAlertResponse}
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

export default ReviewAlertsScreen;