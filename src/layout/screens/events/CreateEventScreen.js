import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Card, Input } from "react-native-elements";
import PickerExample from "./PickerExample";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import UuidGenerator from "../../../util/UuidGenerator";
import { getData, storeData, updateUserInfo } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import ModalSelector from "react-native-modal-selector";

class CreateEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "N/A",
      details: "N/A",
      location: "N/A",
      rsvpCode: "N/A",
      coHosts: "N/A",
      eventType: "N/A",
      eventId: "N/A",
      userId: "N/A",
      profileImage: "N/A",
      fullname: "",
      isVisible: false,
      isMenuVisible: false,
      startDate: "-",
      endDate: "-",
      start: false,
      end: false,
      signedUp: false,
    };
    this.eventNameInput = React.createRef();
    this.detailsInput = React.createRef();
    this.locationInput = React.createRef();
    this.rsvpInput = React.createRef();
    this.coHostsInput = React.createRef();
    this.eventTypeInput = React.createRef();
  }

  isInputEmpty() {
    var empty = false;
    for (var key in this.state) {
      if (key != "userId" && key != "eventId" && key != "rsvpCode" && key != "profileImage" && key != "coHosts" && key != "start"  && key != "end" && key != "signedUp" && key != "endDate" && key != "startDate" && key != "isVisible" && key != "isMenuVisible") {
        if (this.state[key] == "N/A" || this.state[key] == "" || this.state[key] === "-" || this.state[key] === false)  {
          // console.log(key);
          empty = true;
        }
      }
    }
    return empty;
  }


  startState = () => {
    this.setState({
      start: true,
    });
  };

  endState = () => {
    this.setState({
      start: false,
      end: true,
    });
  };
  handlePicker = (datetime) => {
    this.hidePicker;
    if (this.state.start) {
      this.setState({
        isVisible: false,
        startDate: moment(datetime, "MMMM, Do YYYY hh:mm A").format(
          "MMMM, Do YYYY    hh:mm A"
        ),
      });
    } else if (this.state.end) {
      this.setState({
        isVisible: false,
        endDate: moment(datetime, "MMMM, Do YYYY hh:mm A").format(
          "MMMM, Do YYYY    hh:mm A"
        ),
      });
    }
  };

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };

  openMenu = () => {
    this.setState({
      isMenuVisible: true,
    });
  };

  closeMenu = () => {
    this.setState({
      isMenuVisible: false,
    });
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={true} style={styles.container}>
        <Card containerStyle={styles.cardShadows}>
          <Card.Title>Create Event</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>
            Event Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            ref={this.eventNameInput}
            returnKeyType={"done"}
            blurOnSubmit={false}
            placeholder="e.g. Harrison's birthday party"
            onChangeText={(eventName) =>
              this.setState({ eventName: eventName })
            }
          ></TextInput>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.startState();
                this.showPicker();
              }}
              style={styles.timeBtn}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  alignItems: "center",
                }}
              >
                Select Start Date and Time
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.isVisible}
              mode="datetime"
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
            />
          </View>
          <View>
            <Text style={styles.textDate}>{this.state.startDate}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.endState();
                this.showPicker();
              }}
              style={styles.timeBtn}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  alignItems: "center",
                }}
              >
                Select End Date and Time
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.isVisible}
              mode="datetime"
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
            />
          </View>
          <View>
            <Text style={styles.textDate}>{this.state.endDate}</Text>
          </View>
          <View>
            <Text> </Text>
          </View>
          <Text style={styles.text}>
            Details <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInputMultipleLine}
            ref={this.detailsInput}
            returnKeyType={"next"}
            multiline = {true}
            onSubmitEditing={() => {
              this.locationInput.current.focus();
            }}
            blurOnSubmit={false}
            placeholder="e.g. relevant details to specific event"
            onChangeText={(details) => this.setState({ details: details })}
          ></TextInput>
          <Text style={styles.text}>
            Location <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            ref={this.locationInput}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.rsvpInput.current.focus();
            }}
            blurOnSubmit={false}
            placeholder="e.g. 1234 Cherry Lane, Hampton, VA 42039"
            onChangeText={(location) => this.setState({ location: location })}
          ></TextInput>
          <Text style={styles.text}>
            RSVP Code
          </Text>
          <TextInput
            style={styles.textInput}
            ref={this.rsvpInput}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.coHostsInput.current.focus();
            }}
            blurOnSubmit={false}
            placeholder="e.g. 192837"
            onChangeText={(rsvpCode) => this.setState({ rsvpCode: rsvpCode })}
          ></TextInput>
          <Text style={styles.text}>
            Co-hosts
          </Text>
          <TextInput
            style={styles.textInput}
            ref={this.coHostsInput}
            returnKeyType={"done"}
            blurOnSubmit={false}
            placeholder="e.g. Henry Lake, Bill Johnson"
            onChangeText={(coHosts) => this.setState({ coHosts: coHosts })}
          ></TextInput>
          <Text style={styles.text}>
            Choose an Event Type <Text style={{ color: "red" }}>*</Text>
          </Text>
          <ModalSelector
            data={[
              { key: 0, label: "Outdoor" },
              { key: 1, label: "Meeting" },
              { key: 2, label: "Party" },
              { key: 3, label: "Food" },
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
            onChange={(eventType) => {
              this.setState({ eventType: eventType.label });
            }}
          >
            {this.state.eventType == "N/A" && (
              <TextInput
                style={styles.textInput}
                editable={false}
                value={this.state.eventType}
              ></TextInput>
            )}

            {this.state.eventType != "N/A" && (
              <TextInput
                style={styles.textInputOther}
                editable={false}
                value={this.state.eventType}
              ></TextInput>
            )}
          </ModalSelector>

          <TouchableOpacity
            style={styles.createBtn}
            onPress={async () => {
              this.state.eventId = await UuidGenerator.generateUuid();
              let userInfo = await getData(USERINFO);
              this.state.fullname = userInfo.fullname;
              this.state.profileImage = userInfo.profile.profileImageUrl;
              this.state.userId = userInfo.profile.id;
              if (this.isInputEmpty()) {
                alert(
                  "Empty fields detected! Please complete all fields before submitting!"
                );
              } else {
                this.props.navigation.push("ReviewEvents", {
                  eventInfo: this.state,
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
              Create Event
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
}

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
    flexDirection: "row",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textDate: {
    fontSize: 15,
    padding: 10,
    color: "gray",
    textAlign: "center",
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
  textInputOther: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    borderColor: "black",
    color: "black",
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
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  timeBtn: {
    backgroundColor: "#70AF1A",
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
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  createBtn: {
    backgroundColor: "#006400",
    marginTop: 10,
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
  row: {
    flexDirection: "row",
    paddingBottom: 10,
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

export default CreateEventsScreen;
