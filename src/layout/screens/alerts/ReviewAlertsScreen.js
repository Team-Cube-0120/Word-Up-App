import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
import SubmissionDialog from "../../../components/dialog/SubmissionDialog";
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
const sleep = require("../../../util/Thread");

class ReviewAlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.alertInfo = this.props.route.params.alertInfo;
    this.state = {
      isLoading: false,
      toggleDialog: false,
      title: "",
      addAlertResponse: " ",
      isResponseError: false,
    };
  }

  async updateAlertInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        let userInfo = await getData(USERINFO);
        userInfo.alertIds.push(this.alertInfo.alertId);
        let body = await RequestOptions.setUpRequestBody(
          "users",
          userInfo.id,
          userInfo
        );
        await ApiService.update("data/update", body);
        await storeData(USERINFO, userInfo);
        resolve();
      } catch (error) {
        console.log("error: " + error);
        reject(error);
      }
    });
  }

  async addAlert() {
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody(
      "alerts",
      this.alertInfo.alertId,
      this.alertInfo
    )
      .then((body) => ApiService.post("data/add", body))
      .then((response) => this.updateAlertInfo())
      .then((response) =>
        this.setState({
          title: "Congratulations",
          addAlertResponse: "Your alert has been successfully posted!",
        })
      )
      .catch((error) =>
        this.setState({
          isResponseError: true,
          title: "Oops!",
          addAlertResponse:
            "There was a problem adding your alert information. Please try again.",
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
      this.props.navigation.navigate("Alerts");
    }
    this.setState({ isResponseError: false });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Card style={styles.cardShadows}>
            <Card.Title>Review Alerts Information</Card.Title>
            <Card.Divider></Card.Divider>
            <View style={styles.containerViewDetail}>
              <Text style={styles.title}>Name: </Text>
              <Text style={styles.value}>{this.alertInfo.name}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Severity: </Text>
              <Text style={styles.value}>{this.alertInfo.severity}</Text>
            </View>
            <View style={styles.containerViewDetail}>
              <Text style={styles.titleDetail}>Details: </Text>
              <Text style={styles.value}>{this.alertInfo.details}</Text>
            </View>
            <View style={styles.containerViewDetail}>
              <Text style={styles.titleDetail}>Location: </Text>
              <Text style={styles.value}>{this.alertInfo.location}</Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.title}>Alert Type: </Text>
              <Text style={styles.value}>{this.alertInfo.alertType}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                style={styles.buttonRight}
                title="Submit"
                color={"#006400"}
                onPress={() => this.addAlert()}
              ></Button>
            </View>
            <ActivityIndicator animating={this.state.isLoading} />
          </Card>
        </ScrollView>
        <SubmissionDialog
          visible={this.state.toggleDialog}
          onClose={() => this.closeDialog()}
          text={this.state.addAlertResponse}
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
    marginBottom: "5%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "3%",
    backgroundColor: "#FAFAFA",
  },

  titleDetail: {
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
    alignSelf: "flex-start",
  },

  containerViewDetail: {
    width: "100%",
    marginBottom: "5%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "3%",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "3%",
    paddingRight: "3%",
    backgroundColor: "#FAFAFA",
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

  title: {
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  value: {
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    height: 80, // might be a problem for other screens
    justifyContent: "space-evenly",
  },

  buttonRight: {
    alignSelf: "stretch",
  },
});

export default ReviewAlertsScreen;
