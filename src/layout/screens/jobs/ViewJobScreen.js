import { Height } from '@material-ui/icons';
import React, { Component } from 'react';
import { View, ScrollView, Button, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import { getData } from '../../../util/LocalStorage';

class ViewJobScreen extends Component {
    constructor(props) {
        super(props);
        let jobInfo = this.props.route.params.jobInfo;
        let userInfo = this.props.route.params.userInfo;
        this.state = {
            jobInfo: jobInfo,
            userInfo: userInfo,
            editButtonView: null,
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
                    <Image
                        source={{ uri: 'https://reactjs.org/logo-og.png' }}
                        style={styles.companyImage} />
                    <Text style={styles.jobTitle}>{this.state.jobInfo.position}</Text>
                    <Text style={styles.companyTitle}>{this.state.jobInfo.company}</Text>
                    <Text style={styles.jobTypeText}>{this.state.jobInfo.jobType}</Text>
                    <View style={styles.locationView}>
                        <Image
                            source={require('../../../../assets/location_icon.jpg')}
                            style={styles.locationIcon} />
                        <Text style={styles.locationText}>{this.state.jobInfo.city}, {this.state.jobInfo.state}</Text>
                    </View>
                    <View style={styles.buttonRight}>
                        {this.state.editButtonView}
                    </View>
                    <View style={styles.buttonLeft}>
                        <Button
                            title="Apply"
                            disabled={true}
                            onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <Card.Divider></Card.Divider>
                    <Text style={styles.datePostedText}>Posted {this.state.jobInfo.datePosted.toString()}</Text>
                </Card>
                <Card>
                    <Card.Title style={styles.cardTitle}>Job Description</Card.Title>
                    <Text style={styles.value}>{this.state.jobInfo.jobDescription}</Text>
                </Card>
                <Card>
                    <Card.Title style={styles.cardTitle}>About the Company</Card.Title>
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
                </Card>
                <Card style={styles.lastCard}>
                    <Card.Title style={styles.cardTitle}>Job Poster</Card.Title>
                    <View style={styles.profileImage}>
                        <Avatar
                            rounded
                            source={{
                                uri: this.state.userInfo.profileImageUrl,
                            }}
                        />
                        <Text style={styles.profileTitle}>{this.state.userInfo.fullname}</Text>
                    </View>
                </Card>
                <View style={styles.adjustBottomMargin}></View>
                {/* <Card>
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
                </Card> */}
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
        fontWeight: 'bold'
    },

    jobTitle: {
        fontWeight: 'bold',
        marginTop: '2%',
        fontSize: 20
    },

    companyTitle: {
        fontWeight: '200',
        // marginTop: '1%',
        fontSize: 16
    },

    value: {
        fontSize: 16
    },

    buttonView: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: '5%',
        marginBottom: '5%'
    },

    buttonLeft: {
        marginBottom: '5%'
    },

    buttonRight: {
        marginBottom: '5%'
    },

    companyImage: {
        height: 50,
        width: 50
    },

    locationView: {
        flexDirection: 'row',
        right: '1%',
        marginBottom: '5%'
    },

    locationIcon: {
        marginTop: '1%',
        height: 12,
        width: 12,
    },

    jobTypeText: {

    },

    locationText: {
        marginLeft: '1%'
    },

    datePostedText: {
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'italic'
    },

    profileImage: {
        textAlign: 'left',
        flexDirection: 'row',
        marginBottom: '5%'
    },

    profileTitle: {
        marginLeft: '3%',
        marginTop: '2%'
    },

    adjustBottomMargin: {
        marginTop: '5%'
    }


});

export default ViewJobScreen;