import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Input } from "react-native-elements";
import UuidGenerator from "../../../util/UuidGenerator";
import PickerExample from "./PickerExample";
import DropDownSeverityExample from "./DropDownSeverityExample";
import ModalSelector from "react-native-modal-selector";
import { USERINFO } from '../../../enums/StorageKeysEnum';
import { getData } from '../../../util/LocalStorage';
import moment from 'moment'

class CreateAlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "N/A",
      severity: "N/A",
      details: "N/A",
      location: "N/A",
      alertType: "N/A",
      alertId: "N/A",
      userId: "N/A",
      profileImage: "N/A",
      fullname : "N/A",
      datePosted: "N/A"
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.cardShadows}>
          <Card.Title>Create Alert</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>Name <Text style={{ color: "red" }}>*</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. tropical storm"
            onChangeText={(name) => this.setState({ name: name })}
          ></TextInput>
          <Text style={styles.text}>Severity <Text style={{ color: "red" }}>*</Text></Text>

        <ModalSelector
            data={[
              { key: 0, label: "None" },
              { key: 1, label: "Low" },
              { key: 2, label: "Medium" },
              { key: 3, label: "High" },
              { key: 4, label: "Urgent" },
            ]}
            initValue={"N/A"}
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

          <Text style={styles.text}>Location <Text style={{ color: "red" }}>*</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 1234 Cherry Lane, Hampton, VA 42039"
            onChangeText={(location) => this.setState({ location: location })}
          ></TextInput>
          <Text style={styles.text}>Details <Text style={{ color: "red" }}>*</Text></Text>
          <TextInput
            style={styles.textInputMultipleLine}
            placeholder="e.g. relevant details for this alert"
            multiline={true}
            onChangeText={(details) => this.setState({ details: details })}
          ></TextInput>

          <Text style={styles.text}>Choose an Alert Type <Text style={{ color: "red" }}>*</Text></Text>

          <ModalSelector
            data={[
              { key: 0, label: "Weather" },
              { key: 1, label: "Emergency" },
              { key: 2, label: "Community Alert" },
              { key: 3, label: "Special Announcement" },
              { key: 4, label: "Other" },
            ]}
            initValue={"N/A"}
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

          <TouchableOpacity style={styles.button}>
            <Button
              style={styles.btnText}
              title="Review"
              color={"#70AF1A"}
              onPress={async () => {
                let userInfo = await getData(USERINFO);
                var time = new Date().getTime()
                this.state.alertId = await UuidGenerator.generateUuid();
                this.state.fullname = userInfo.fullname;
                this.state.datePosted = time;
                this.state.profileImage = userInfo.profile.profileImageUrl;
                this.state.userId = userInfo.profile.id;
                this.props.navigation.navigate("ReviewAlerts", {
                  alertInfo: this.state,
                });
              }}
            ></Button>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
}
//use this as reference for edit/confirm screens
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    flexDirection: "column",
  },
  space: {
    margin: 10,
  },
  error: {
    color: "red",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  textInputMultipleLine: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
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

export default CreateAlertsScreen;
