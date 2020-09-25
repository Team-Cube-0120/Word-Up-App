import React, { Component } from 'react';
import { View, ScrollView, Button, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import ApiService from '../../../service/api/ApiService';
import RequestOptions from '../../../service/api/RequestOptions';
import SubmissionDialog from '../../../components/dialog/SubmissionDialog';
import { getData, storeData } from '../../../util/LocalStorage';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import ReviewEditEventDialog from '../../../components/dialog/ReviewEditEventDialog';
const sleep = require('../../../util/Thread');

class editEventScreen extends Component {
    constructor(props) {
        super(props)
        let eventInfo = this.props.route.params.eventInfo;
        this.state = {
            eventName: eventInfo.eventName,
            datePosted: new Date().toISOString().slice(0, 10),
            eventId: eventInfo.eventId,
            toggleDialog: false,
            isLoading: false
        }
    }

    editEvent() {
        this.setState({ isLoading: true});
        RequestOptions.setUpRequestBody("events", this.state.eventId, this.state)
            .then((body) => ApiService.update("data/update", body))
            .then((response) => sleep(5000))
            .then(() => {
                this.closeDialog();
                this.setState({ isLoading: false })
                this.props.navigation.navigate("Events");
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
                                value={this.state.eventName}
                                onChangeText={(eventName) => this.setState({ eventName: eventName })} />
                        </View>
                      
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
                <ReviewEditEventDialog
                    visible={this.state.toggleDialog}
                    onSubmit={() => this.editEvent()}
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


export default editEventScreen;