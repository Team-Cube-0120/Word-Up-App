import React, { Component } from 'react';
import { Card, Avatar, ListItem } from 'react-native-elements';
import BaseCard from './BaseCard';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import PropTypes from 'prop-types';
import ApiService from '../../service/api/ApiService';
import { DEFAULT_PROFILE_IMAGE } from '../../enums/DefaultEnums';

class JobCard extends BaseCard {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.object,
        userInfo: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            userProfileImageUrl: DEFAULT_PROFILE_IMAGE,
            userFullName: 'N/A'
        }
    }

    render() {
        let fields = this.renderCardViews();
        return (
            <Card>
                <View style={this.styles.cardTitle}>
                    <Avatar
                        rounded
                        source={{
                            uri: this.props.userInfo.profileImageUrl,
                        }}
                    />
                    <Text style={this.styles.userTitle}>{this.props.userInfo.fullname}</Text>
                </View>
                <Card.Divider></Card.Divider>
                {fields}
            </Card>
        );
    }

    renderCardViews() {
        return (
            <View>
                <Text style={this.styles.jobTitle}>{this.props.title}</Text>
                <View style={this.styles.companyImageView}>
                    <Image
                        style={this.styles.companyImage}
                        source={{
                            uri: 'https://reactjs.org/logo-og.png',
                        }}
                    />
                </View>
                <View style={this.styles.containerView}>
                    {/* <Text style={this.styles.labels}>Company</Text> */}
                    <Text style={this.styles.companyInfo}>{this.props.data.company}</Text>
                </View>
                <View style={this.styles.containerView}>
                    {/* <Text style={this.styles.labels}>Job Type</Text> */}
                    <Text style={this.styles.companyInfo}>{this.props.data.jobType}</Text>
                </View>
                <View style={this.styles.containerView}>
                    {/* <Text style={this.styles.labels}>Location</Text> */}
                    <Text style={this.styles.companyInfo}>{this.props.data.street}</Text>
                </View>
                <Text style={this.styles.datePostedText}>Posted {this.props.data.datePosted}</Text>

            </View>
        )
    }
}

export default JobCard;