import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

class ReviewJobScreen extends Component {
    constructor(props) {
        super(props);
        this.jobInfo = this.props.route.params.jobInfo;
    }

    render() {
        // const jobInfo = this.props.navigation.getParams('jobInfo');
        console.log(this.jobInfo.position);
        return (
            <View>
                <ScrollView>
                    <Card>
                        <Card.Title>Review Job Information</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={styles.containerView}>
                            <Text style={styles.title}>Position: </Text>
                            <Text>{this.jobInfo.position}</Text>
                        </View>
                        <View>
                            <Text>Job Type: </Text>
                            <Text>{this.jobInfo.jobType}</Text>
                        </View>
                        <View>
                            <Text>Company: </Text>
                            <Text>{this.jobInfo.company}</Text>
                        </View>
                        <View>
                            <Text>Job Description: </Text>
                            <Text>{this.jobInfo.jobDescription}</Text>
                        </View>
                        <View>
                            <Text>Job Application URL: </Text>
                            <Text>{this.jobInfo.jobAppUrl}</Text>
                        </View>
                        <View>
                            <Text>Email: </Text>
                            <Text>{this.jobInfo.email}</Text>
                        </View>
                        <View>
                            <Text>Phone Number: </Text>
                            <Text>{this.jobInfo.phoneNumber}</Text>
                        </View>
                        <View>
                            <Text>Street: </Text>
                            <Text>{this.jobInfo.street}</Text>
                        </View>
                        <View>
                            <Text>City: </Text>
                            <Text>{this.jobInfo.city}</Text>
                        </View>
                        <View>
                            <Text>State: </Text>
                            <Text>{this.jobInfo.state}</Text>
                        </View>
                        <View>
                            <Text>Zip: </Text>
                            <Text>{this.jobInfo.zip}</Text>
                        </View>
                    </Card>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        width: '100%',
        flexDirection: 'row'
    },

    title: {
        fontWeight: 'bold',
        marginRight: '3%',
        fontFamily: 'sans-serif',
    }
});

export default ReviewJobScreen;