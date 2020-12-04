import React, { Component } from "react";
import { Card, Avatar, ListItem } from "react-native-elements";
import BaseCard from "./BaseCard";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TextInput,
    ScrollView,
    Button,
} from "react-native";
import PropTypes from "prop-types";
import ApiService from "../../service/api/ApiService";
import { DEFAULT_PROFILE_IMAGE } from "../../enums/DefaultEnums";
const calculateDaysPassed = require("../../formatter/TimeFormatter")
    .calculateDaysPassed;

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class AccountCard extends BaseCard {
    static propTypes = {
        userInfo: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Card containerStyle={styles.cardShadows}>
                <View style={styles.cardTitle}>
                    <Avatar
                        rounded
                        source={{
                            uri: this.props.userInfo.profile.profileImageUrl,
                        }}
                    />
                    <Text style={styles.userTitle}>
                        {this.props.userInfo.profile.fullname}
                    </Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardShadows: {
        borderBottomColor:"gray",
        borderBottomWidth: 0.5,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
            default: {
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 2,
            },
        }),
    },

    containerView: {
        left: '1%'
    },

    labels: {
        marginRight: '2%'
    },

    cardTitle: {
        textAlign: 'left',
        flexDirection: 'row',
        marginBottom: '5%'
    },

    userTitle: {
        fontFamily: font,
        marginLeft: '3%',
        marginTop: '2%'
    },

    jobTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '3%'
    },

    datePostedText: {
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: '5%'
    },

    companyInfo: {
        fontSize: 16
    },

    companyImageView: {
        marginBottom: '1%'
    },

    companyImage: {
        height: 80,
        width: 80,
        borderRadius: 10
    }
});

export default AccountCard;
