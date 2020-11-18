import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
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

class ReviewJobScreen extends Component {
  constructor(props) {
    super(props);
    this.eventInfo = this.props.route.params.eventInfo;
    this.state = {
      isLoading: false,
      toggleDialog: false,
      title: "",
      addEventResponse: " ",
      isResponseError: false,
    };
  }

  async addEvent() {
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody(
      "events",
      this.eventInfo.eventId,
      this.eventInfo
    )
      .then((body) => ApiService.post("data/events/add", body))
      .then((response) => updateUserInfo(this.eventInfo.userId))
      .then((response) =>
        this.setState({
          title: "Congratulations",
          addEventResponse: "Your event has been successfully posted!",
          isLoading: false,
        })
      )
      .catch((error) =>
        this.setState({
          isResponseError: true,
          title: "Oops!",
          addEventResponse:
            "There was a problem adding your event information. Please try again.",
          isLoading: false,
        })
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
      this.props.navigation.navigate("Events");
    }
    this.setState({ isResponseError: false });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Card>
            <Card.Title>Review Event Information</Card.Title>
            <Card.Divider></Card.Divider>
            <View style={styles.containerView}>
              <Text style={styles.title}>Event Name: </Text>
              <Text style={styles.value}>{this.eventInfo.eventName}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Details: </Text>
              <Text style={styles.value}>{this.eventInfo.details}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Locations: </Text>
              <Text style={styles.value}>{this.eventInfo.location}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>RSVP Code: </Text>
              <Text style={styles.value}>{this.eventInfo.rsvpCode}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Co-Hosts: </Text>
              <Text style={styles.value}>{this.eventInfo.coHosts}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Event Type: </Text>
              <Text style={styles.value}>{this.eventInfo.eventType}</Text>
            </View>

            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => this.addEvent()}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
            <ActivityIndicator animating={this.state.isLoading} />
          </Card>
        </ScrollView>
        <SubmissionDialog
          visible={this.state.toggleDialog}
          onClose={() => this.closeDialog()}
          text={this.state.addEventResponse}
          title={this.state.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    flexDirection: "row",
    marginBottom: "3%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: "6%",
    paddingBottom: "1%",
    paddingLeft: "3%",
    backgroundColor: "#FAFAFA",
  },

  title: {
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  buttonSubmit: {
    backgroundColor: "#006400",
    marginTop: 20,
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

  value: {
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    height: 60, // might be a problem for other screens
    justifyContent: "space-evenly",
  },

  buttonRight: {
    alignSelf: "stretch",
  },
});

export default ReviewJobScreen;
