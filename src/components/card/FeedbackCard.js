import React, { Component } from "react";
import { Card, Avatar, ListItem } from "react-native-elements";
import BaseCard from "./BaseCard";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
} from "react-native";
import PropTypes from "prop-types";
import { DEFAULT_PROFILE_IMAGE } from "../../enums/DefaultEnums";
import moment from "moment";
import { Rowing } from "@material-ui/icons";

class FeedbackCard extends BaseCard {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.object,
        userInfo: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            userProfileImageUrl: DEFAULT_PROFILE_IMAGE,
            userFullName: "N/A",
        };
    }

    render() {
        let fields = this.renderCardViews();
        return (
            <Card containerStyle={styles.borderHighlight}>
                <View style={this.styles.cardTitle}>
                    <Avatar
                        rounded
                        source={{
                            uri: this.props.data.profileImg,
                        }}
                    />
                    <Text style={styles.cardTitle} >
                        {this.props.data.name}
                    </Text>
                </View>
                <Card.Divider></Card.Divider>
                {fields}
            </Card>
        );
    }

    renderCardViews() {
        return (
            <View>
                <View style={styles.text}>
                    <Text style={styles.text2}>Rating: {this.props.data.rating}</Text>
                </View>
                <View>
                    <Text >{this.props.data.feedback}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardTitle: {
        paddingLeft: 15,
        textAlign: "left",
        borderBottomWidth: 4,
        marginBottom: 5,
        borderBottomColor: "#000",
        borderBottomLeftRadius: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: "darkblue",
    },
   borderHighlight:  {
        borderRadius: 20,
        borderWidth: 3,
        borderBottomColor: "gray",
        borderColor: "gray",
   },
   text:{
       flexDirection:'row',
   },
   text2:{
    fontSize: 16,
    color: "salmon",
    fontWeight: 'bold'
    }

});

export default FeedbackCard;
