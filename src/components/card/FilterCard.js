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

class FilterCard extends BaseCard {
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
    return (
      <View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>User:</Text>
          <Text style={styles.text}>{this.props.data.name}</Text>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>Rating:</Text>
          <Text style={styles.text}>{this.props.data.rating}</Text>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.labels}>Feedback:</Text>
          <Text style={styles.text}>{this.props.data.feedback}</Text>
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

export default FilterCard;
