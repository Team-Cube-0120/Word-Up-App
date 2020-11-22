import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { Card, Input } from "react-native-elements";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import UuidGenerator from "../../../util/UuidGenerator";
import { getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class CreateJobScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "N/A",
      jobType: "N/A",
      company: "N/A",
      jobDescription: "N/A",
      jobAppUrl: "N/A",
      email: "N/A",
      phoneNumber: "N/A",
      street: "N/A",
      city: "N/A",
      state: "N/A",
      zip: "N/A",
      jobId: "N/A",
      userId: "N/A",
      postedTime: "N/A",
    };
    this.positionInput = React.createRef();
    this.jobTypeInput = React.createRef();
    this.companyInput = React.createRef();
    this.jobDescriptionInput = React.createRef();
    this.jobAppUrlInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneNumberInput = React.createRef();
    this.streetInput = React.createRef();
    this.cityInput = React.createRef();
    this.stateInput = React.createRef();
    this.zipInput = React.createRef();
  }

  isInputEmpty() {
    var empty = false;
    for (var key in this.state) {
      if (key != "userId" && key != "jobId") {
        if (this.state[key] == "N/A" || this.state[key] == "") {
          empty = true;
        }
      }
    }
    return empty;
  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView
          extraScrollHeight={25}
          style={styles.container}
        >
          <Card containerStyle={styles.cardShadows}>
            <Card.Title>New Job Listing</Card.Title>
            <Card.Divider />
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Position</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Software Engineer"
                onChangeText={(position) =>
                  this.setState({ position: position })
                }
                ref={this.positionInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.jobTypeInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Job Type</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Full-time, Part-time, etc."
                onChangeText={(jobType) => this.setState({ jobType: jobType })}
                ref={this.jobTypeInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.companyInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Company</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Google"
                onChangeText={(company) => this.setState({ company: company })}
                ref={this.companyInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.jobDescriptionInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Job Description</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInputMultipleLine}
                placeholder="e.g. Role, Minimum Requirements"
                multiline={true}
                onChangeText={(jobDescription) =>
                  this.setState({ jobDescription: jobDescription })
                }
                ref={this.jobDescriptionInput}
                returnKeyType={"done"}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Job Application URL</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. http://google.com/careers/<job-id>"
                onChangeText={(jobAppUrl) =>
                  this.setState({ jobAppUrl: jobAppUrl })
                }
                ref={this.jobAppUrlInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.emailInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. John.Doe@gmail.com"
                onChangeText={(email) => this.setState({ email: email })}
                ref={this.emailInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.phoneNumberInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Phone Number</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 123-456-7890"
                onChangeText={(phoneNumber) =>
                  this.setState({ phoneNumber: phoneNumber })
                }
                ref={this.phoneNumberInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.streetInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Street</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 1234 Honeywell Lane"
                onChangeText={(street) => this.setState({ street: street })}
                ref={this.streetInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.cityInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>City</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Hampton"
                onChangeText={(city) => this.setState({ city: city })}
                ref={this.cityInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.stateInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>State</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Virginia"
                onChangeText={(state) => this.setState({ state: state })}
                ref={this.stateInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.zipInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.viewItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Zipcode</Text>
                <Text style={styles.inlineText}> *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                ref={this.zipInput}
                returnKeyType={"done"}
                placeholder="e.g. 12345"
                onChangeText={(zip) => this.setState({ zip: zip })}
                blurOnSubmit={false}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonReview}
              onPress={async () => {
                this.state.jobId = await UuidGenerator.generateUuid();
                let userInfo = await getData(USERINFO);
                this.setState({ postedTime: new Date().getTime() });
                this.state.userId = userInfo.profile.id;
                if (this.isInputEmpty()) {
                  alert(
                    "Empty fields detected! Please complete all fields before submitting!"
                  );
                } else {
                  this.props.navigation.push("ReviewJobs", {
                    jobInfo: this.state,
                  });
                }
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  alignItems: "center",
                }}
              >
                Review
              </Text>
            </TouchableOpacity>
          </Card>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
title = "Review";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    flexDirection: "column",
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    height: 40,
  },

  textInputMultipleLine: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    height: 150,
    marginRight: "3%",
    paddingRight: "3%",
    textAlignVertical: "top",
    paddingTop: 10,
    paddingBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },

  inlineText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "red",
  },

  viewItem: {
    width: "100%",
    marginBottom: 10,
  },

  buttonReview: {
    backgroundColor: "#006400",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 4,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 4,
        shadowRadius: 2,
        elevation: 3,
      },
    }),
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  cardShadows: {
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

export default CreateJobScreen;
