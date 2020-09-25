import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import { getData } from '../../../util/LocalStorage';

class ViewJobScreen extends Component {
    constructor(props) {
        super(props);
        let jobInfo = this.props.route.params.jobInfo;
        this.state = {
            jobInfo: jobInfo,
            editButtonView: <View></View>
        }
    }

    componentDidMount() {
        this.isEditable();
    }

    async isEditable() {
        let userInfo = await getData(USERINFO);
        if (userInfo.admin || userInfo.jobIds.includes(this.state.jobInfo.jobId)) {
            this.setState({
                editButtonView: <Button 
                    style={styles.buttonRight}
                    title="Edit"
                    onPress={() => this.props.navigation.push("EditJob", { jobInfo: this.state.jobInfo })}></Button>
            })
        }
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <Card.Title style={styles.cardTitle}>{this.state.jobInfo.position}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Job Type: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.jobType}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Company: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.company}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Job Description: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.jobDescription}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Job Application URL: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.jobAppUrl}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Email: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.email}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Phone Number: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.phoneNumber}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Street: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.street}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>City: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.city}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>State: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.state}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Zip: </Text>
                        <Text style={styles.value}>{this.state.jobInfo.zip}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Button style={styles.buttonLeft}
                            title="Apply"
                            disabled={true}
                            onPress={() => this.props.navigation.goBack()}></Button>
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

    cardTitle: {
        textAlign: 'left'
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

export default ViewJobScreen;