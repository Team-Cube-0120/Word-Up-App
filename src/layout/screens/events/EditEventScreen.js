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
import ReviewEditEventDialog from "../../../components/dialog/ReviewEditEventDialog";
import PickerExample from "./PickerExample";
const sleep = require("../../../util/Thread");
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

class editEventScreen extends Component {
  constructor(props) {
    super(props);
    let eventInfo = this.props.route.params.eventInfo;
    this.state = {
      eventName: eventInfo.eventName,
      details: eventInfo.details,
      location: eventInfo.location,
      rsvpCode: eventInfo.rsvpCode,
      coHosts: eventInfo.coHosts,
      eventType: eventInfo.eventType,
      startDate: eventInfo.startDate,
      endDate: eventInfo.endDate,
      datePosted: new Date().toISOString().slice(0, 10),
      eventId: eventInfo.eventId,
      toggleDialog: false,
      isLoading: false,
      start: false,
      end: false,
    };
  }

  editEvent() {
    this.setState({ isLoading: true });
    RequestOptions.setUpRequestBody("events", this.state.eventId, this.state)
      .then((body) => ApiService.update("data/update", body))
      .then((response) => sleep(5000))
      .then(() => {
        this.closeDialog();
        this.setState({ isLoading: false });
        this.props.navigation.navigate("Events");
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.cardShadows}>
          <Card.Title>Edit Event Information</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>Event Name *</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.eventName}
            onChangeText={(eventName) =>
              this.setState({ eventName: eventName })
            }
          />

          <View>
            <Button
              title="Edit Start Date and Time"
              onPress={() => {
                this.startState();
                this.showPicker();
              }}
            />
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
            <Button
              title="Select End Date and End Time"
              onPress={() => {
                this.endState();
                this.showPicker();
              }}
            />
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
          <Text style={styles.text}>Details</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.details}
            onChangeText={(details) => this.setState({ details: details })}
          />
          <Text style={styles.text}>Location *</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.location}
            onChangeText={(location) => this.setState({ location: location })}
          ></TextInput>
          <Text style={styles.text}>RSVP Code</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.rsvpCode}
            onChangeText={(rsvpCode) => this.setState({ rsvpCode: rsvpCode })}
          ></TextInput>
          <Text style={styles.text}>Co-hosts</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.coHosts}
            onChangeText={(coHosts) => this.setState({ coHosts: coHosts })}
          ></TextInput>

          <Text style={styles.text}>Event Type *</Text>
          <PickerExample
            value={this.state.eventType}
            onSelection={(eventType) => this.setState({ eventType: eventType })}
          />

          <View style={styles.buttonView}>
            <Button
              style={styles.buttonLeft}
              title="Go Back"
              onPress={() => this.props.navigation.goBack()}
            ></Button>
            <Button
              style={styles.buttonRight}
              title="Review"
              onPress={() => this.openDialog()}
            ></Button>
          </View>
        </Card>

        <ReviewEditEventDialog
          visible={this.state.toggleDialog}
          onSubmit={() => this.editEvent()}
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
    padding: 5,
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
    height: 150, // might be a problem for other screens
    justifyContent: "space-evenly",
  },

  buttonRight: {
    alignSelf: "stretch",
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

export default editEventScreen;
