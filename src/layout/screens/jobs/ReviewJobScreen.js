import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
import SubmissionDialog from "../../../components/dialog/SubmissionDialog";
import { getData, storeData, updateUserInfo } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
const sleep = require("../../../util/Thread");

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class ReviewJobScreen extends Component {
  constructor(props) {
    super(props);
    this.jobInfo = this.props.route.params.jobInfo;
    this.state = {
      isLoading: false,
      toggleDialog: false,
      title: "",
      addJobResponse: " ",
      isResponseError: false,
    };
  }

  async addJob() {
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody("jobs", this.jobInfo.jobId, this.jobInfo)
      .then((body) => ApiService.post("data/jobs/add", body))
      .then((response) => updateUserInfo())
      .then((response) =>
        this.setState({
          title: "Congratulations",
          addJobResponse: "Your job has been successfully posted!",
        })
      )
      .catch((error) => {
        console.log(error);
        this.setState({
          isResponseError: true,
          title: "Oops!",
          addJobResponse:
            "There was a problem adding your job information. Please try again.",
        })
      }
      )
      .then(() => this.openDialog());
  }

  openDialog() {
    this.setState({ isLoading: false });
    this.setState({ toggleDialog: true });
  }

  closeDialog() {
    this.setState({ toggleDialog: false });
    if (!this.state.isResponseError) {
      this.props.navigation.navigate("Jobs", { isJobCreated: true });
    }
    this.setState({ isResponseError: false });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Card containerStyle={styles.cardShadows}>
            <Card.Title style={{fontFamily: font}}>Review Job Information</Card.Title>
            <Card.Divider></Card.Divider>
            <View style={styles.containerView}>
              <Text style={styles.title}>Position: </Text>
              <Text style={styles.value}>{this.jobInfo.position}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Job Type: </Text>
              <Text style={styles.value}>{this.jobInfo.jobType}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Company: </Text>
              <Text style={styles.value}>{this.jobInfo.company}</Text>
            </View>
            <View style={styles.containerViewDetail}>
              <Text style={styles.titleDetail}>Job Description: </Text>
              <Text style={styles.value}>{this.jobInfo.jobDescription}</Text>
            </View>
            <View style={styles.containerViewDetail}>
              <Text style={styles.titleDetail}>Job Application URL: </Text>
              <Text style={styles.value}>{this.jobInfo.jobAppUrl}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Email: </Text>
              <Text style={styles.value}>{this.jobInfo.email}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Phone Number: </Text>
              <Text style={styles.value}>{this.jobInfo.phoneNumber}</Text>
            </View>
            <View style={styles.containerViewDetail}>
              <Text style={styles.titleDetail}>Street: </Text>
              <Text style={styles.value}>{this.jobInfo.street}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>City: </Text>
              <Text style={styles.value}>{this.jobInfo.city}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>State: </Text>
              <Text style={styles.value}>{this.jobInfo.state}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Zip: </Text>
              <Text style={styles.value}>{this.jobInfo.zip}</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonSubmit}
              onPress={() => this.addJob()}
            >
              <Text
                style={{
                  fontFamily: font,
                  fontSize: 18,
                  color: "white",
                  alignItems: "center",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>

            <ActivityIndicator animating={this.state.isLoading} />
          </Card>
        </ScrollView>
        <SubmissionDialog
          visible={this.state.toggleDialog}
          onClose={() => this.closeDialog()}
          text={this.state.addJobResponse}
          title={this.state.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    marginBottom: "3%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "baseline",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "3%",
  },

  containerViewDetail: {
    flex: 1,
    width: "100%",
    marginBottom: "5%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "3%",
    alignSelf: "flex-start",
    paddingRight: "3%",
    backgroundColor: "#FAFAFA",
  },

  title: {
    fontFamily: font,
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  titleDetail: {
    fontFamily: font,
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
    alignSelf: "flex-start",
  },

  value: {
    fontFamily: font,
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    height: 150, // might be a problem for other screens
    justifyContent: "space-evenly",
  },

  buttonSubmit: {
    backgroundColor: "#006400",
    marginTop: 5,
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

export default ReviewJobScreen;
