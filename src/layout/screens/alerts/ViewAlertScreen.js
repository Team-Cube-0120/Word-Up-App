import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  LogBox,
} from "react-native";
import { Card } from "react-native-elements";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData, storeData, updateUserInfo } from "../../../util/LocalStorage";

import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

class ViewAlertScreen extends Component {
  constructor(props) {
    super(props);
    let alertInfo = this.props.route.params.alertInfo;
    this.state = {
      alertInfo: alertInfo,
      editButtonView: <View></View>,
      deleteAlertView: <View></View>,
      isLoading: false,
      toggleDialog: false,
    };
  }

  componentDidMount() {
    this.isEditable();
    this.props.navigation.setOptions({
      title: "Alert Information",
    });
  }

  closeDialog() {
    this.setState({ toggleDialog: false });
  }

  openDialog() {
    this.setState({ toggleDialog: true });
  }

  async removeAlertInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        let userInfo = await getData(USERINFO);
        for (var i = 0; i < userInfo.alertIds.length; i++) {
          if (userInfo.alertIds[i] === this.state.alertInfo.alertId) {
            userInfo.alertIds.splice(i, 1);
          }
        }
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

  deleteAlert() {
    this.removeAlertInfo();
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody(
      "alerts",
      this.state.alertInfo.alertId,
      this.state
    )
      .then((body) => ApiService.delete("data/delete", body))
      .then(() => {
        this.removeAlertInfo().then(() => {
          this.props.navigation.navigate("Alerts");
          Alert.alert(
            "Congratulations!",
            "Your event has been successfully deleted!"
          );
        });
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "There was a problem deleting your event. Please try again."
        );
      });
  }

  async isEditable() {
    let userInfo = await getData(USERINFO);
    if (
      userInfo.admin ||
      userInfo.alertIds.includes(this.state.alertInfo.alertId)
    ) {
      this.setState({
        editButtonView: (
          <Button
            style={styles.buttonRight}
            title="Edit"
            onPress={() =>
              this.props.navigation.push("EditAlert", {
                alertInfo: this.state.alertInfo,
              })
            }
          ></Button>
        ),
        deleteAlertView: (
          <Button
            style={styles.buttonRight}
            color={"red"}
            title="Delete"
            onPress={() => this.deleteAlert()}
          ></Button>
        ),
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.cardShadows}>
          <Card.Title style={styles.cardTitle}>
            {this.state.alertInfo.name}
          </Card.Title>
          <Card.Divider></Card.Divider>
          <View style={styles.containerView}>
            <Text style={styles.title}>Alert Name: </Text>
            <Text style={styles.value}>{this.state.alertInfo.name}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Severity: </Text>
            <Text style={styles.value}>{this.state.alertInfo.severity}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Location: </Text>
            <Text style={styles.value}>{this.state.alertInfo.location}</Text>
          </View>
          <View style={styles.containerViewDetail}>
            <Text style={styles.titleDetail}>Details: </Text>
            <Text style={styles.value}>{this.state.alertInfo.details}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Alert Type: </Text>
            <Text style={styles.value}>{this.state.alertInfo.alertType}</Text>
          </View>

          <View style={styles.buttonView}>
            {this.state.editButtonView}
            {this.state.deleteAlertView}
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    marginBottom: "3%",
  },
  container: {
    backgroundColor: "#FAFAFA",
    flexDirection: "column",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 20,
  },

  title: {
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  titleDetail: {
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
    alignSelf: "flex-start",
  },

  containerViewDetail: {
    width: "100%",
    marginBottom: "3%",
    marginRight: "3%",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingRight: "3%",
  },

  value: {
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    height: 120, // might be a problem for other screens
    justifyContent: "space-evenly",
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

  buttonRight: {
    alignSelf: "stretch",
  },
});

export default ViewAlertScreen;
