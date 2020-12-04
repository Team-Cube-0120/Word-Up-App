import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  LogBox,
} from "react-native";
import { Card } from "react-native-elements";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData, storeData, updateUserInfo } from "../../../util/LocalStorage";
import DeleteDialog from "../../../components/dialog/DeleteDialog";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class ViewAlertScreen extends Component {
  constructor(props) {
    super(props);
    let alertInfo = this.props.route.params.alertInfo;
    let userInfo = this.props.route.params.userInfo;
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


  deleteAlert() {
    let itemId = this.state.alertInfo.alertId;
    this.setState({ deleteLoading: true });
    ApiService.delete(
      "data/alerts/delete?collection=alerts&document=" +
        itemId +
        "&userId=" +
        this.state.alertInfo.userId
    )
      .then((response) => updateUserInfo())
      .then((response) => {
        this.closeDialog();
        Alert.alert("Notice", "Your alert has been deleted", [
          {
            text: "Return",
            onPress: () => this.props.navigation.navigate("Alerts"),
          },
        ]);
      })
      .catch((error) => {
        this.closeDialog();
        Alert.alert(
          'Error',
          'There was a problem deleting this alert. Please try again.',
          [{
            text: 'Close',
            onPress: () => this.closeDialog()
          }]
        )
      })
  }

  async isEditable() {
    let userInfo = await getData(USERINFO);
    if (
      userInfo.admin ||
      userInfo.alertIds.includes(this.state.alertInfo.alertId)
    ) {
      styles.buttonView = {
        flexDirection: "column",
        width: "100%",
        height: 110,
        justifyContent: "space-evenly",
      };
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
            onPress={() => this.openDialog()}
          ></Button>
        ),
      });
    } else {
      styles.buttonView = {
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-evenly",
      };
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.cardShadows}>
          <Card.Title style={styles.cardTitle}>
            {this.state.alertInfo.name}
          </Card.Title>
          <Card.Divider></Card.Divider>
          <View style={styles.containerView}>
            <Text  style={styles.title}>
              Alert Name:{" "}
            </Text>
            <Text style={styles.value}>{this.state.alertInfo.name}</Text>
          </View>
          <View style={styles.containerView}>
            <Text  style={styles.title}>
              Severity:{" "}
            </Text>
            <Text style={styles.value}>{this.state.alertInfo.severity}</Text>
          </View>
          <View style={styles.containerView}>
            <Text  style={styles.title}>
              Location:{" "}
            </Text>
            <Text style={styles.value}>{this.state.alertInfo.location}</Text>
          </View>
          <View style={styles.containerViewDetail}>
            <Text  style={styles.titleDetail}>
              Details:{" "}
            </Text>
            <Text style={styles.value}>{this.state.alertInfo.details}</Text>
          </View>
          <View style={styles.containerView}>
            <Text  style={styles.title}>
              Alert Type:{" "}
            </Text>
            <Text style={styles.value}>{this.state.alertInfo.alertType}</Text>
          </View>

          <DeleteDialog
            visible={this.state.toggleDialog}
            onClose={() => this.closeDialog()}
            onSubmit={() => this.deleteAlert()}
            isSubmitting={false}
          ></DeleteDialog>

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
    fontFamily: font,
    textAlign: "center",
    fontSize: 20,
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

  containerViewDetail: {
    width: "100%",
    marginBottom: "3%",
    marginRight: "3%",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingRight: "3%",
  },

  value: {
    fontFamily: font,
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
  },

  cardShadows: {
    borderBottomWidth: 3,
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
