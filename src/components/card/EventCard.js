import React, { Component } from "react";
import { Card } from "react-native-elements";
import BaseCard from "./BaseCard";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class EventCard extends BaseCard {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let fields = this.renderCardViews();
    return (
      <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
        <View style={styles.rightBox}>
          <Text></Text>
        </View>

        <View style={styles.containerStyle}>
          <Text style={styles.cardTitle}>{this.props.title}</Text>
          {fields}
        </View>
      </View>
    );
  }

  renderCardViews() {
    if (this.props.data.eventType == "Outdoor") {
      styles.rightBox = {
        width: "8%",
        height: 150,
        backgroundColor: "green",
        padding: 10,
      };
    } else if (this.props.data.eventType == "Party") {
      styles.rightBox = {
        width: "8%",
        height: 150,
        backgroundColor: "salmon",
        padding: 10,
      };
    } else if (this.props.data.eventType == "Food") {
      styles.rightBox = {
        width: "8%",
        height: 150,
        backgroundColor: "lightblue",
        padding: 10,
      };
    } else if (this.props.data.eventType == "Meeting") {
      styles.rightBox = {
        width: "8%",
        height: 150,
        backgroundColor: "red",
        padding: 10,
      };
    }
    return (
      <View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>Event Type:</Text>
          <Text style={styles.text}>{this.props.data.eventType}</Text>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>Event Start:</Text>
          <Text style={styles.text}>{this.props.data.startDate}</Text>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>Event End:</Text>
          <Text style={styles.text}>{this.props.data.endDate}</Text>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>Location:</Text>
          <Text style={styles.text}>{this.props.data.location}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    flexDirection: "row",
  },
  containerStyle: {
    width: "90%",
    height: 150,
    backgroundColor: "white",
    padding: 10,
    borderBottomColor:"gray",
    borderBottomWidth: 0.3,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 4,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 4,
        shadowRadius: 3,
        elevation: 3,
      },
    }),
  },
  containerStyleCard: {
    backgroundColor: "powderblue",
  },

  labels: {
    fontFamily: font,
    fontWeight: "bold",
    marginRight: "3%",
    fontSize: 16,
  },

  cardTitle: {
    fontFamily: font,
    textAlign: "left",
    borderBottomWidth: 5,
    marginBottom: 10,
    borderBottomColor: "#000",
    fontSize: 20,
    fontWeight: "bold",
    color: "darkblue",
  },
  rightBox: {
    width: "8%",
    height: 150,
    backgroundColor: "salmon",
    padding: 10,
  },
  text: {
    fontFamily: font,
    fontSize: 16,
  },
});

export default EventCard;
