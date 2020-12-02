import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
import SubmissionDialog from "../../../components/dialog/SubmissionDialog";
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import ReviewEditAlertDialog from "../../../components/dialog/ReviewEditAlertDialog";
import PickerExample from "./PickerExample";
const sleep = require("../../../util/Thread");
import moment from "moment";
import ModalSelector from "react-native-modal-selector";

class editAlertScreen extends Component {
  constructor(props) {
    super(props);
    let alertInfo = this.props.route.params.alertInfo;
    this.state = {
      name: alertInfo.name,
      details: alertInfo.details,
      location: alertInfo.location,
      severity: alertInfo.severity,
      alertType: alertInfo.alertType,
      alertId: alertInfo.alertId,
      toggleDialog: false,
      isLoading: false,
    };
  }

  editAlert() {
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody("alerts", this.state.alertId, this.state)
      .then((body) => ApiService.update("data/update", body))
      .then((response) => sleep(5000))
      .then(() => {
        this.closeDialog();
        this.setState({ isLoading: false });
        this.props.navigation.navigate("Alerts", { isAlertCreated: true });
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
      <ScrollView style={styles.container}>
        <Card>
          <Card.Title>Edit Alert Information</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>
            Alert Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.name}
            onChangeText={(name) => this.setState({ name: name })}
          />

          <Text style={styles.text}>
            Severity <Text style={{ color: "red" }}>*</Text>
          </Text>

          <ModalSelector
            data={[
              { key: 0, label: "None" },
              { key: 1, label: "Low" },
              { key: 2, label: "Medium" },
              { key: 3, label: "High" },
              { key: 4, label: "Urgent" },
              { key: 5, label: "Other" },
            ]}
            initValue={this.state.severity}
            supportedOrientations={["portrait"]}
            accessible={true}
            animationType="fade"
            cancelText="Cancel"
            supportedOrientations={["portrait"]}
            optionContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#006400",
              flexDirection: "row",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            optionTextStyle={{
              color: "#70AF1A",
              alignItems: "center",
              fontWeight: "bold",
            }}
            cancelTextStyle={{ color: "red", fontWeight: "bold" }}
            cancelContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#006400",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            overlayStyle={{
              flex: 1,
              padding: "5%",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
            scrollViewAccessibilityLabel={"Scrollable options"}
            cancelButtonAccessibilityLabel={"Cancel Button"}
            onChange={(severity) => {
              this.setState({ severity: severity.label });
            }}
          >
            {this.state.severity == "N/A" && (
              <TextInput
                style={styles.textInput}
                editable={false}
                value={this.state.severity}
              ></TextInput>
            )}

            {this.state.severity != "N/A" && (
              <TextInput
                style={styles.textInputOther}
                editable={false}
                value={this.state.severity}
              ></TextInput>
            )}
          </ModalSelector>
          <Text style={styles.text}>
            Details <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInputMultipleLine}
            multiline = {true}
            value={this.state.details}
            onChangeText={(details) => this.setState({ details: details })}
          />
          <Text style={styles.text}>
            Location <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.location}
            onChangeText={(location) => this.setState({ location: location })}
          ></TextInput>

          <Text style={styles.text}>
            Alert Type <Text style={{ color: "red" }}>*</Text>
          </Text>

          <ModalSelector
            data={[
              { key: 0, label: "Weather" },
              { key: 1, label: "Emergency" },
              { key: 2, label: "Community Alert" },
              { key: 3, label: "Special Announcement" },
              { key: 4, label: "Other" },
            ]}
            initValue={this.state.alertType}
            supportedOrientations={["portrait"]}
            accessible={true}
            animationType="fade"
            cancelText="Cancel"
            supportedOrientations={["portrait"]}
            optionContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#006400",
              flexDirection: "row",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            optionTextStyle={{
              color: "#70AF1A",
              alignItems: "center",
              fontWeight: "bold",
            }}
            cancelTextStyle={{ color: "red", fontWeight: "bold" }}
            cancelContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#006400",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            overlayStyle={{
              flex: 1,
              padding: "5%",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
            scrollViewAccessibilityLabel={"Scrollable options"}
            cancelButtonAccessibilityLabel={"Cancel Button"}
            onChange={(alertType) => {
              this.setState({ alertType: alertType.label });
            }}
          >
            {this.state.eventType == "N/A" && (
              <TextInput
                style={styles.textInput}
                editable={false}
                value={this.state.alertType}
              ></TextInput>
            )}

            {this.state.eventType != "N/A" && (
              <TextInput
                style={styles.textInputOther}
                editable={false}
                value={this.state.alertType}
              ></TextInput>
            )}
          </ModalSelector>

          <View style={styles.buttonView}>
            <Button
              style={styles.buttonRight}
              title="Review"
              color={"#70AF1A"}
              onPress={() => this.openDialog()}
            ></Button>
          </View>
        </Card>

        <ReviewEditAlertDialog
          visible={this.state.toggleDialog}
          onSubmit={() => this.editAlert()}
          onClose={() => this.closeDialog()}
          data={this.state}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    // flexDirection: 'row',
    marginBottom: "3%",
  },
  container: {
    backgroundColor: "#FAFAFA",
    flexDirection: "column",
  },
  cardTitle: {
    textAlign: "left",
  },

  instructions: {
    marginBottom: "5%",
  },
  text: {
    
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textInput: {
    
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },

  textInputOther: {
    
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    borderColor: "black",
    color: "black",
    borderWidth: 1,
    paddingLeft: 10,
  },

  title: {
    
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  value: {
    fontSize: 16,
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: "2%",
  },

  textInputMultipleLine: {
    
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    height: 150,
    textAlignVertical: "top",
    paddingTop: 10,
    paddingBottom: 10,
  },
  textDate: {
    fontSize: 16,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
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

export default editAlertScreen;
