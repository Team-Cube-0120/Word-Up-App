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
import { DEFAULT_PROFILE_IMAGE } from "../../enums/DefaultEnums";
import moment from "moment";
const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class AlertCard extends BaseCard {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    userInfo: PropTypes.object,
  };
  constructor(props) {
    super(props);
    // console.log(this.props)
    this.state = {
      titleOne: <View></View>,
      titleTwo: <Text></Text>,
      userProfileImageUrl: DEFAULT_PROFILE_IMAGE,
      userFullName: "N/A",
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
              fontFamily: font,
              marginBottom: "3%",
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
              fontFamily: font,
              marginTop: 5,
              marginLeft: "2%",
              marginBottom: "3%",
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
              fontFamily: font,
              marginTop: 5,
              marginLeft: "2%",
              marginBottom: "3%",
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
              fontFamily: font,
              marginTop: 5,
              marginLeft: "2%",
              marginBottom: "3%",
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
              fontFamily: font,
              marginTop: 5,
              marginLeft: "2%",
              marginBottom: "3%",
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
              fontFamily: font,
              marginTop: 5,
              marginLeft: "2%",
              marginBottom: "3%",
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
          <Text style={{ fontFamily: font, fontWeight: "bold", fontSize: 18 }}>
            {this.props.data.name}
          </Text>
          <Text style={{ fontFamily: font, fontWeight: "bold", fontSize: 15, color: "#a9a9a9" }}>
            {this.props.data.details}
          </Text>
        </View>
        <Card.Divider style={{ borderBottomWidth: 1 }}></Card.Divider>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <Avatar
                rounded
                size={"small"}
                source={{
                  uri: this.props.userInfo.profileImageUrl,
                }}
              ></Avatar>
              <Text style={{ fontFamily: font, marginLeft: "5%", marginTop: "3%" }}>
                {this.props.userInfo.fullname}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={{ fontFamily: font, marginTop: "3%" }}>
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
              fontFamily: font,
              marginTop: 3,
              marginLeft: "10%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text  style={{ fontFamily: font, color: "gray" }}>
              {this.props.data.severity}
            </Text>
          </Text>
        );
      } else {
        return (
          <Text
            
            style={{
              fontFamily: font,
              marginTop: 8,
              marginLeft: "18%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "gray" }}>
              {this.props.data.severity}
            </Text>
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
              fontFamily: font,
              top: 3,
              marginLeft: "10%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "#006400" }}>
              {this.props.data.severity}
            </Text>
          </Text>
        );
      } else {
        return (
          <Text
            
            style={{
              fontFamily: font,
              marginTop: 8,
              marginLeft: "18%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "#006400" }}>
              {this.props.data.severity}
            </Text>
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
              fontFamily: font,
              marginTop: "1%",
              marginLeft: "10%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "#FDE541" }}>
              {this.props.data.severity}
            </Text>
          </Text>
        );
      } else {
        return (
          <Text
            
            style={{
              fontFamily: font,
              marginTop: 8,
              marginLeft: "18%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "#FDE541" }}>
              {this.props.data.severity}
            </Text>
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
              fontFamily: font,
              top: 3,
              marginLeft: "10%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "orange" }}>
              {this.props.data.severity}
            </Text>
          </Text>
        );
      } else {
        return (
          <Text
            
            style={{
              fontFamily: font,
              marginTop: 8,
              marginLeft: "15%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "orange" }}>
              {this.props.data.severity}
            </Text>
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
              fontFamily: font,
              top: 3,
              marginLeft: "10%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "red" }}>
              {this.props.data.severity}
            </Text>
          </Text>
        );
      } else {
        return (
          <Text
            
            style={{
              fontFamily: font,
              marginTop: 8,
              marginLeft: "18%",
              fontSize: 12,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Severity:{" "}
            <Text style={{ fontFamily: font, color: "red" }}>
              {this.props.data.severity}
            </Text>
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
