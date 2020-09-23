import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import BaseCard from './BaseCard';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native-gesture-handler';

class EventCard extends BaseCard {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.object
    }

    constructor(props) {
        super(props)
    }

    render() {
        let fields = this.renderCardViews();
        return (
            <Card>
                <Card.Title style={this.styles.cardTitle}>{this.props.title}</Card.Title>
                {fields}
            </Card>
        );
    }

    renderCardViews() {
        return (
            <View>
                <View style={this.styles.containerView}>
                    <Text style={this.styles.labels}>Event Name</Text>
                    <Text>{this.props.data.eventName}</Text>
                </View>
                <View style={this.styles.containerView}>
                    <Text style={this.styles.labels}>Event Type</Text>
                    <Text>{this.props.data.eventType}</Text>
                </View>
                <View style={this.styles.containerView}>
                    <Text style={this.styles.labels}>Location</Text>
                    <Text>{this.props.data.location}</Text>
                </View>
            </View>
        )
    }
}

export default EventCard;