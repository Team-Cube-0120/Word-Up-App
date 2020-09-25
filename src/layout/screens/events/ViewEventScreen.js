import React, { Component } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import { getData } from '../../../util/LocalStorage';

class ViewEventScreen extends Component {
    constructor(props) {
        super(props);
        let eventInfo = this.props.route.params.eventInfo;
        this.state = {
            eventInfo: eventInfo,
            editButtonView: <View></View>
        }
    }

    componentDidMount() {
        this.isEditable();
    }

    async isEditable() {
        let userInfo = await getData(USERINFO);
        if (userInfo.admin || userInfo.eventIds.includes(this.state.eventInfo.eventId)) {
            this.setState({
                editButtonView: <Button 
                    style={styles.buttonRight}
                    title="Edit"
                    onPress={() => this.props.navigation.push("EditEvent", { eventInfo: this.state.eventInfo })}></Button>
            })
        }
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <Card.Title style={styles.cardTitle}>{this.state.eventInfo.position}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>Event Name: </Text>
                        <Text style={styles.value}>{this.state.eventInfo.eventName}</Text>
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

export default ViewEventScreen;