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
      borderStyle: {
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
    };
  }

  componentDidMount() {
    this.renderTitleOne();
    console.log(moment(this.props.data.datePosted).toString())
  }

  async renderTitleTwo() {
    if (this.props.data.severity == "None") {
      if (this.props.data.alertType == "Special Announcement") {
        this.setState({
          titleTwo: (
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
          ),
        });
      } else {
        this.setState({
          titleTwo: (
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
          ),
        });
      }
    } else if (this.props.data.severity == "Low") {
      this.setState({
        borderStyle: {
          borderRadius: 10,
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
        },
      });

      if (this.props.data.alertType == "Special Announcement") {
        this.setState({
          titleTwo: (
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
              <Text style={{ color: "#70AF1A" }}>
                {this.props.data.severity}
              </Text>
            </Text>
          ),
        });
      } else {
        this.setState({
          titleTwo: (
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
              <Text style={{ color: "#70AF1A" }}>
                {this.props.data.severity}
              </Text>
            </Text>
          ),
        });
      }
    } else if (this.props.data.severity == "Medium") {
      this.setState({
        borderStyle: {
          borderRadius: 10,
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
        },
      });
      if (this.props.data.alertType == "Special Announcement") {
        this.setState({
          titleTwo: (
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
              <Text style={{ color: "yellow" }}>
                {this.props.data.severity}
              </Text>
            </Text>
          ),
        });
      } else {
        this.setState({
          titleTwo: (
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
              <Text style={{ color: "yellow" }}>
                {this.props.data.severity}
              </Text>
            </Text>
          ),
        });
      }
    } else if (this.props.data.severity == "High") {
      this.setState({
        borderStyle: {
          borderRadius: 10,
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
        },
      });
      if (this.props.data.alertType == "Special Announcement") {
        this.setState({
          titleTwo: (
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
              <Text style={{ color: "orange" }}>
                {this.props.data.severity}
              </Text>
            </Text>
          ),
        });
      } else {
        this.setState({
          titleTwo: (
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
              <Text style={{ color: "orange" }}>
                {this.props.data.severity}
              </Text>
            </Text>
          ),
        });
      }
    } else if (this.props.data.severity == "Urgent") {
      this.setState({
        borderStyle: {
          borderRadius: 10,
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
        },
      });
      if (this.props.data.alertType == "Special Announcement") {
        this.setState({
          titleTwo: (
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
          ),
        });
      } else {
        this.setState({
          titleTwo: (
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
          ),
        });
      }
    }
  }

  renderTitleOne() {
    this.renderTitleTwo().then(() => {
      if (this.props.data.alertType == "Special Announcement") {
        //Special Announcement
        this.setState({
          titleOne: (
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
              {this.state.titleTwo}
            </View>
          ),
        });
      } else if (this.props.data.alertType == "Weather") {
        // Weather
        this.setState({
          titleOne: (
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
              {this.state.titleTwo}
            </View>
          ),
        });
      } else if (this.props.data.alertType == "Emergency") {
        // Emergency
        this.setState({
          titleOne: (
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
              {this.state.titleTwo}
            </View>
          ),
        });
      } else if (this.props.data.alertType == "Community Alert") {
        this.setState({
          titleOne: (
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
              {this.state.titleTwo}
            </View>
          ),
        });
      } else if (this.props.data.alertType == "Other") {
        this.setState({
          titleOne: (
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
              {this.state.titleTwo}
            </View>
          ),
        });
      }
    });
  }

  render() {
    return (
      <Card containerStyle={this.state.borderStyle}>
        {this.state.titleOne}
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
            style={{ fontWeight: "bold", fontSize: 15 }}
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
              {moment(this.props.data.datePosted).fromNow()}
            </Text>
          </View>
        </View>
      </Card>

    );
  }
}

export default AlertCard;
