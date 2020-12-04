import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
import SubmissionDialog from "../../../components/dialog/SubmissionDialog";
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import ReviewEditJobDialog from "../../../components/dialog/ReviewEditJobDialog";
const sleep = require("../../../util/Thread");

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class EditJobScreen extends Component {
  constructor(props) {
    super(props);
    let jobInfo = this.props.route.params.jobInfo;
    this.state = {
      position: jobInfo.position,
      jobType: jobInfo.jobType,
      company: jobInfo.company,
      jobDescription: jobInfo.jobDescription,
      jobAppUrl: jobInfo.jobAppUrl,
      email: jobInfo.email,
      phoneNumber: jobInfo.phoneNumber,
      street: jobInfo.street,
      city: jobInfo.city,
      state: jobInfo.state,
      zip: jobInfo.zip,
      jobId: jobInfo.jobId,
      toggleDialog: false,
      isLoading: false,
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
        if (this.state[key] === "") {
          empty = true;
        }
      }
    }
    return empty;
  }

  editJob() {
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody("jobs", this.state.jobId, this.state)
      .then((body) => ApiService.update("data/update", body))
      //.then((response) => sleep(5000))
      .then(() => {
        this.closeDialog();
        this.setState({ isLoading: false });
        this.props.navigation.navigate("Jobs", { isJobCreated: true });
        Alert.alert(
          "Congratulations!",
          "Your job information has been successfully edited!"
        );
      })
      .catch((error) => {
        this.closeDialog();
        this.setState({ isLoading: false });
        Alert.alert(
          "Error",
          "There was a problem editing your job information. Please try again."
        );
      });
  }

  closeDialog() {
    this.setState({ toggleDialog: false });
  }

  openDialog() {
    this.setState({ toggleDialog: true });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#FAFAFA" }}>
        <ScrollView>
          <Card containerStyle={styles.cardShadows}>
            <Card.Title style={styles.cardTitle}>
              Edit Job Information
            </Card.Title>
            <Text style={styles.instructions}>
              Please carefully change the fields below. Fields marked with (
              <Text style={{ fontFamily: font, color: "red" }}>*</Text>) must not be left empty.
            </Text>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Position: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.position}
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
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Job Type: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.jobType}
                onChangeText={(jobType) => this.setState({ jobType: jobType })}
                ref={this.jobTypeInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.companyInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Company: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.company}
                onChangeText={(company) => this.setState({ company: company })}
                ref={this.companyInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.jobDescriptionInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Job Description: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.textInputMultipleLine}
                multiline={true}
                value={this.state.jobDescription}
                onChangeText={(jobDescription) =>
                  this.setState({ jobDescription: jobDescription })
                }
                ref={this.jobDescriptionInput}
                returnKeyType={"done"}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Job Application URL: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.jobAppUrl}
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
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Email: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
                ref={this.emailInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.phoneNumberInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Phone Number: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.phoneNumber}
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
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Street: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.street}
                onChangeText={(street) => this.setState({ street: street })}
                ref={this.streetInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.cityInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                City: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.city}
                onChangeText={(city) => this.setState({ city: city })}
                ref={this.cityInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.stateInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                State: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                value={this.state.state}
                onChangeText={(state) => this.setState({ state: state })}
                ref={this.stateInput}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  this.zipInput.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            <View style={styles.containerView}>
              <Text style={styles.title}>
                Zipcode: <Text style={{ fontFamily: font, color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.value}
                ref={this.zipInput}
                returnKeyType={"done"}
                value={this.state.zip}
                onChangeText={(zip) => this.setState({ zip: zip })}
                blurOnSubmit={false}
              />
            </View>
            <Card.Divider />
            {/* <Button style={styles.buttonLeft}
                                title="Go Back"
                                onPress={() => this.props.navigation.goBack()}></Button> */}
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => this.openDialog()}
            >
              <Text
                style={{
                  fontFamily: font,
                  fontSize: 18,
                  color: "white",
                  alignItems: "center",
                }}
              >
                Review
              </Text>
            </TouchableOpacity>
            {/* <Button
                    style={styles.buttonRight}
                    onPress={() => this.openDialog()}
                  ></Button> */}
          </Card>
        </ScrollView>
        <ReviewEditJobDialog
          visible={this.state.toggleDialog}
          onSubmit={() => this.editJob()}
          onClose={() => this.closeDialog()}
          data={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    // flexDirection: 'row',
    marginBottom: "3%",
  },

  cardTitle: {
    fontFamily: font,
    textAlign: "left",
  },

  instructions: {
    fontFamily: font,
    marginBottom: "5%",
  },

  title: {
    fontFamily: font,
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  value: {
    fontFamily: font,
    fontSize: 16,
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: "2%",
  },

  textInputMultipleLine: {
    fontFamily: font,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    height: 150,
    textAlignVertical: "top",
    paddingTop: 10,
    paddingBottom: 10,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    height: 150, // might be a problem for other screens
    justifyContent: "space-evenly",
  },

  buttonRight: {
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
    marginLeft: 15,
    marginRight: 15,
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

export default EditJobScreen;
