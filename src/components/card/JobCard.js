import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import BaseCard from './BaseCard';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native-gesture-handler';

class JobCard extends BaseCard {
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
                    <Text style={this.styles.labels}>Company</Text>
                    <Text>{this.props.data.company}</Text>
                </View>
                <View style={this.styles.containerView}>
                    <Text style={this.styles.labels}>Job Type</Text>
                    <Text>{this.props.data.jobType}</Text>
                </View>
                <View style={this.styles.containerView}>
                    <Text style={this.styles.labels}>Location</Text>
                    <Text>{this.props.data.street}</Text>
                </View>
                <View style={this.styles.containerView}>
                    <Text style={this.styles.labels}>Date Posted</Text>
                    <Text>{this.props.data.datePosted}</Text>
                </View>
            </View>
        )
    }
}

export default JobCard;