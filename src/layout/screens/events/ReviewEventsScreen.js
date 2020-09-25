import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import ApiService from '../../../service/api/ApiService';
import RequestOptions from '../../../service/api/RequestOptions';
import SubmissionDialog from '../../../components/dialog/SubmissionDialog';
import { getData, storeData } from '../../../util/LocalStorage';
import { USERINFO } from '../../../enums/StorageKeysEnum';
const sleep = require('../../../util/Thread');


class ReviewJobScreen extends Component {
    constructor(props) {
        super(props);
        this.eventInfo = this.props.route.params.eventInfo;
        this.state = {
            isLoading: false,
            toggleDialog: false,
            title: '',
            addEventResponse: ' ',
            isResponseError: false
        };
    }

    async updateEventInfo() {
        return new Promise(async (resolve, reject) => {
            try {
                let userInfo = await getData(USERINFO);
                userInfo.eventIds.push(this.eventInfo.eventId);
                let body = await RequestOptions.setUpRequestBody("users", userInfo.id, userInfo);
                await ApiService.update('data/update', body);
                await storeData(USERINFO, userInfo);
                resolve();
            } catch (error) {
                console.log("error: " + error);
                reject(error);
            }  
        })
    }


    async addEvent() {
        this.setState({ isLoading: true });
        RequestOptions.setUpRequestBody("events", this.eventInfo.eventId, this.eventInfo)
            .then((body) => ApiService.post('data/add', body))
            .then((response) => this.updateEventInfo())
            .then((response) => this.setState({
                title: 'Congratulations',
                addEventResponse: 'Your event has been successfully posted!'
            }))
            .catch((error) => this.setState({
                isResponseError: true,
                title: 'Oops!',
                addEventResponse: 'There was a problem adding your event information. Please try again.'
            }))
            .then(() => this.openDialog())
    }

    openDialog() {
        this.setState({ isLoading: false });
        this.setState({ toggleDialog: true });
    }

    closeDialog() {
        this.setState({ toggleDialog: false });
        if (!this.state.isResponseError) {
            this.props.navigation.navigate("Events");
        }
        this.setState({ isResponseError: false });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Card>
                        <Card.Title>Review Event Information</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Event Name: </Text>
                            <Text style={styles.value}>{this.eventInfo.eventName}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Details: </Text>
                            <Text style={styles.value}>{this.eventInfo.details}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Locations: </Text>
                            <Text style={styles.value}>{this.eventInfo.location}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>RSVP Code: </Text>
                            <Text style={styles.value}>{this.eventInfo.rsvpCode}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Co-Hosts: </Text>
                            <Text style={styles.value}>{this.eventInfo.coHosts}</Text>
                        </View>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Event Type: </Text>
                            <Text style={styles.value}>{this.eventInfo.eventType}</Text>
                        </View>
                       
                        <View style={styles.buttonView}>
                            <Button style={styles.buttonLeft}
                                title="Go Back"
                                onPress={() => this.props.navigation.goBack()}></Button>
                            <Button style={styles.buttonRight}
                                title="Submit"
                                onPress={() => this.addEvent()}></Button>
                        </View>
                        <ActivityIndicator animating={this.state.isLoading} />
                    </Card>
                </ScrollView >
                <SubmissionDialog
                    visible={this.state.toggleDialog}
                    onClose={() => this.closeDialog()}
                    text={this.state.addEventResponse}
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