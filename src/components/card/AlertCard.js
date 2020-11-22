import React, { Component } from "react";
import { Card, Avatar, Icon } from "react-native-elements";
import BaseCard from "./BaseCard";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  Image,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

class AlertCard extends BaseCard {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      titleOne: <View></View>,
      titleTwo: <Text></Text>,
    };
  }

  renderTitleViews(field) {
    if (this.props.data.alertType == "Special Announcement") {
      //Special Announcement
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon name="announcement" size={28} color="#006400" />
          <Text
            style={{
              marginLeft: 5,
              marginBottom: 10,
              borderBottomColor: "#000",
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {this.props.data.alertType}
          </Text>
          {field}
        </View>
      );
    } else if (this.props.data.alertType == "Weather") {
      // Weather
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon name="cloud" size={28} color="blue" />
          <Text
            style={{
              marginTop: 5,
              marginLeft: 5,
              marginBottom: 10,
              borderBottomColor: "#000",
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {this.props.data.alertType}
          </Text>
          {field}
        </View>
      );
    } else if (this.props.data.alertType == "Emergency") {
      // Emergency
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon name="warning" size={28} color="red" />
          <Text
            style={{
              marginLeft: 5,
              marginTop: 5,
              marginBottom: 10,
              borderBottomColor: "#000",
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {this.props.data.alertType}
          </Text>
          {field}
        </View>
      );
    } else if (this.props.data.alertType == "Community Alert") {
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon name="info" size={28} color="#70AF1A" />
          <Text
            style={{
              marginLeft: 5,
              marginTop: 5,
              marginBottom: 10,
              borderBottomColor: "#000",
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {this.props.data.alertType}
          </Text>
          {field}
        </View>
      );
    } else if (this.props.data.alertType == "Other") {
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon name="add-alert" size={28} color="gray" />
          <Text
            style={{
              marginLeft: 5,
              marginTop: 5,
              marginBottom: 10,
              borderBottomColor: "#000",
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {this.props.data.alertType}
          </Text>
          {field}
        </View>
      );
    } else if (this.props.data.alertType == "N/A") {
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon name="add-alert" size={28} color="gray" />
          <Text
            style={{
              marginLeft: 5,
              marginTop: 5,
              marginBottom: 10,
              borderBottomColor: "#000",
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {this.props.data.alertType}
          </Text>
          {field}
        </View>
      );
    }
  }

  render() {
    let field = this.renderViews();
    let renderTitle = this.renderTitleViews(field);
    return (
      <Card containerStyle={styles.borderHighlight}>
        {renderTitle}
        {/* {this.state.titleOne} */}
        <Card.Divider style={{ borderBottomWidth: 1 }}></Card.Divider>
        <View
          style={{
            flexDirection: "column",
            marginBottom: "4%",
            marginLeft: "1%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {this.props.data.name}
          </Text>
          <TextInput
            multiline={true}
            style={{ fontWeight: "bold", fontSize: 15, color: "#a9a9a9" }}
            editable={false}
            value={this.props.data.details}
          ></TextInput>
        </View>
        <Card.Divider style={{ borderBottomWidth: 1 }}></Card.Divider>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <Avatar
                rounded
                size={"small"}
                source={{
                  uri: this.props.data.profileImage,
                }}
              ></Avatar>
              <Text style={{ marginLeft: "5%", marginTop: "3%" }}>
                {this.props.data.fullname}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={{ marginTop: "3%" }}>
              {moment(this.props.data.postedTime).fromNow()}
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  renderViews() {
    if (this.props.data.severity == "None") {
      styles.borderHighlight = {
        borderRadius: 10,
        borderWidth: 3,
        borderBottomColor: "gray",
        borderColor: "gray",
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
      };

      if (this.props.data.alertType == "Special Announcement") {
        return (
          <Text
            style={{
              marginTop: 3,
              marginLeft: 45,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "gray" }}>{this.props.data.severity}</Text>
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              marginTop: 8,
              marginLeft: 65,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "gray" }}>{this.props.data.severity}</Text>
          </Text>
        );
      }
    } else if (this.props.data.severity == "Low") {
      styles.borderHighlight = {
        borderRadius: 10,
        borderWidth: 3,
        borderBottomColor: "#70AF1A",
        borderColor: "#70AF1A",
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
      };

      if (this.props.data.alertType == "Special Announcement") {
        return (
          <Text
            style={{
              top: 3,
              marginLeft: 45,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "#006400" }}>{this.props.data.severity}</Text>
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              marginTop: 8,
              marginLeft: 65,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "#006400" }}>{this.props.data.severity}</Text>
          </Text>
        );
      }
    } else if (this.props.data.severity == "Medium") {
      styles.borderHighlight = {
        borderRadius: 10,
        borderWidth: 3,
        borderBottomColor: "yellow",
        borderColor: "yellow",
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
      };

      if (this.props.data.alertType == "Special Announcement") {
        return (
          <Text
            style={{
              top: 3,
              marginLeft: 45,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "#FDE541" }}>{this.props.data.severity}</Text>
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              marginTop: 8,
              marginLeft: 65,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "#FDE541" }}>{this.props.data.severity}</Text>
          </Text>
        );
      }
    } else if (this.props.data.severity == "High") {
      styles.borderHighlight = {
        borderRadius: 10,
        borderWidth: 3,
        borderBottomColor: "orange",
        borderColor: "orange",
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
      };
      if (this.props.data.alertType == "Special Announcement") {
        return (
          <Text
            style={{
              top: 3,
              marginLeft: 45,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "orange" }}>{this.props.data.severity}</Text>
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              marginTop: 8,
              marginLeft: 65,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "orange" }}>{this.props.data.severity}</Text>
          </Text>
        );
      }
    } else if (this.props.data.severity == "Urgent") {
      styles.borderHighlight = {
        borderRadius: 10,
        borderWidth: 3,
        borderBottomColor: "red",
        borderColor: "red",
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
      };
      if (this.props.data.alertType == "Special Announcement") {
        return (
          <Text
            style={{
              top: 3,
              marginLeft: 45,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "red" }}>{this.props.data.severity}</Text>
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              marginTop: 8,
              marginLeft: 65,
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ color: "red" }}>{this.props.data.severity}</Text>
          </Text>
        );
      }
    } else if (this.props.data.severity == "N/A") {
      styles.borderHighlight = {
        borderRadius: 10,
        borderWidth: 3,
        borderBottomColor: "gray",
        borderColor: "gray",
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
      };
    }
  }
}

const styles = StyleSheet.create({
  borderHighlight: {
    borderRadius: 10,
    borderBottomColor: "gray",
    borderColor: "gray",
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
});

export default AlertCard;
