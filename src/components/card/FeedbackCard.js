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
import { Rating } from "react-native-rating-element";

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
          <Text style={styles.cardTitle}>{this.props.data.name}</Text>
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
          <Text style={styles.text2}>Rating:</Text>
          <Rating
            rated={this.props.data.rating}
            totalCount={5}
            ratingColor="#f1c644"
            ratingBackgroundColor="#d4d4d4"
            size={20}
            readonly={true}
            icon="ios-star"
            direction="row"
          />
        </View>
        <View>
          <Text>{this.props.data.feedback}</Text>
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
    borderBottomColor: "#000",
    borderBottomLeftRadius: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "darkblue",
  },
  borderHighlight: {
    borderRadius: 20,
    // borderWidth: 3,
    borderBottomColor: "gray",
    borderColor: "gray",
  },
  text: {
    flexDirection: "row",
    marginBottom: "2%",
  },
  text2: {
    
    fontSize: 16,
    color: "salmon",
    fontWeight: "bold",
  },
});

export default FeedbackCard;
