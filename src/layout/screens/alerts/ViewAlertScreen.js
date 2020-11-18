import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import { getData } from '../../../util/LocalStorage';

import ApiService from '../../../service/api/ApiService';
import RequestOptions from '../../../service/api/RequestOptions';

class ViewAlertScreen extends Component {
    constructor(props) {
        super(props);
        let alertInfo = this.props.route.params.alertInfo;
        this.state = {
            alertInfo: alertInfo,
            editButtonView: <View></View>,
            deleteAlertView: <View></View>,
            isLoading: false,
            toggleDialog: false,
        }
    }

    componentDidMount() {
        this.isEditable();
    }

    closeDialog() {
        this.setState({ toggleDialog: false })
    }

    openDialog() {
        this.setState({ toggleDialog: true })
    }

    deleteAlert() {
        this.setState({ isLoading: true });
        RequestOptions.setUpRequestBody("alerts", this.state.alertInfo.alertId, this.state)
            .then((body) => ApiService.delete("data/delete", body))
            .then(() => {
                this.props.navigation.navigate("Alerts");
                Alert.alert("Congratulations!", "Your event has been successfully deleted!")
            })
            .catch((error) => {
                Alert.alert("Error", "There was a problem deleting your event. Please try again.")
            })
    }

    
    async isEditable() {
        let userInfo = await getData(USERINFO);
        if (userInfo.admin || userInfo.alertIds.includes(this.state.alertInfo.alertId)) {
            this.setState({
                editButtonView: <Button
                    style={styles.buttonRight}
                    title="Edit"
                    onPress={() => this.props.navigation.push("EditAlert", { alertInfo: this.state.alertInfo })}></Button>,
                deleteAlertView: <Button
                    style={styles.buttonRight}
                    title="Delete"
                    onPress={() => this.deleteAlert()}></Button>
            })
        }
        
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Card>
                    <Card.Title style={styles.cardTitle}>{this.state.alertInfo.name}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Alert Name: </Text>
                        <Text style={styles.value}>{this.state.alertInfo.name}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Severity: </Text>
                        <Text style={styles.value}>{this.state.alertInfo.severity}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Location: </Text>
                        <Text style={styles.value}>{this.state.alertInfo.location}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Details: </Text>
                        <Text style={styles.value}>{this.state.alertInfo.details}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Alert Type: </Text>
                        <Text style={styles.value}>{this.state.alertInfo.alertType}</Text>
                    </View>

                    <View style={styles.buttonView}>
                        {this.state.deleteAlertView}
                        {this.state.editButtonView}
                    </View>
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        width: '100%',
        marginBottom: '3%',
    },
    container: {
        backgroundColor: '#36485f',
        flexDirection: 'column',
        padding: 5,
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 20,
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

export default ViewAlertScreen;