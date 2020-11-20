import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import DeleteDialog from '../../../components/dialog/DeleteDialog';
import { FAB } from "react-native-paper";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
import { getData, storeData, updateUserInfo } from '../../../util/LocalStorage';
import { USERINFO } from '../../../enums/StorageKeysEnum';

class ViewEventScreen extends Component {
  constructor(props) {
    super(props);
    let eventInfo = this.props.route.params.eventInfo;
    this.state = {
      eventInfo: eventInfo,
      editButtonView: <View></View>,
      deleteEventView: <View></View>,
      signUpButtonView: <View></View>,
      unRegister: <View></View>,
      isLoading: false,
      toggleEventDeleteDialog: false,
      deleteLoading: false,
      signedUp: false,
      title: '',
      addEventResponse: '',
    };
  }

  componentDidMount() {
    this.isEditable();
  }

  closeDialog() {
    this.setState({ toggleEventDeleteDialog: false, deleteLoading: false });
  }

  openDialog() {
    this.setState({ toggleEventDeleteDialog: true });
  }

  async deleteEvent() {
    let itemId = this.state.eventInfo.eventId;
    this.setState({ deleteLoading: true });
    ApiService.delete('data/events/delete?collection=events&document=' + itemId + "&userId=" + this.state.eventInfo.userId)
    .then((response) => updateUserInfo(this.state.eventInfo.userId))
    .then((response) => {
        this.closeDialog();
        Alert.alert(
          'Notice',
          'Your event has been deleted',
          [{
            text: 'Return',
            onPress: () => this.props.navigation.navigate("Events")
          }])
      })
      .catch((error) => {
        this.closeDialog();
        Alert.alert(
          'Error',
          'There was a problem deleting this event. Please try again.',
          [{
            text: 'Close',
            onPress: () => this.closeDialog()
          }]
        )
      })
      this.unRegister();
  }


  async signUp() {
    let itemId = this.state.eventInfo.eventId;
    this.setState({ deleteLoading: true });
    RequestOptions.setUpRequestBody("events", this.state.eventInfo.eventId, this.state.eventInfo)
    .then((body) => ApiService.post("data/signup/add", body))
    .then((response) => updateUserInfo(this.state.eventInfo.userId))
    .then((response) => {
        this.closeDialog();
        Alert.alert(
          'Notice',
          'Your event has been signed up',
          [{
            text: 'Return',
            onPress: () => this.props.navigation.navigate("Events")
          }])
      })
      .catch((error) => {
        this.closeDialog();
        Alert.alert(
          'Error',
          'There was a problem registering this event. Please try again.',
          [{
            text: 'Close',
            onPress: () => this.closeDialog()
          }]
        )
      })
  }



  async unRegister() {
    let itemId = this.state.eventInfo.eventId;
    this.setState({ deleteLoading: true });
    RequestOptions.setUpRequestBody("events", this.state.eventInfo.eventId, this.state.eventInfo)
    .then((body) => ApiService.post("data/unregister/delete", body))
    .then((response) => updateUserInfo(this.state.eventInfo.userId))
    .then((response) => {
        this.closeDialog();
        Alert.alert(
          'Notice',
          'Your have successfully unregistered',
          [{
            text: 'Return',
            onPress: () => this.props.navigation.navigate("Events")
          }])
      })
      .catch((error) => {
        this.closeDialog();
        Alert.alert(
          'Error',
          'There was a problem unregistering this event. Please try again.',
          [{
            text: 'Close',
            onPress: () => this.closeDialog()
          }]
        )
      })
  }


  // async unRegister() {
  //   alert("Unregistered!");
  //   setTimeout(
  //     () =>
  //       this.props.navigation.push("SignUp", {
  //         eventInfo: this.state.eventInfo,
  //       }),
  //     2000
  //   );
  // }
  async isEditable() {
    let userInfo = await getData(USERINFO);
    if (
      userInfo.admin ||
      userInfo.eventIds.includes(this.state.eventInfo.eventId)
    ) {
      this.setState({
        editButtonView: (
          <Button
            style={styles.buttonRight}
            title="Edit"
            onPress={() =>
              this.props.navigation.push("EditEvent", {
                eventInfo: this.state.eventInfo,
              })
            }
          ></Button>
        ),
        deleteEventView: (
          <Button
            style={styles.buttonRight}
            title="Delete"
            onPress={() => this.openDialog()}
          ></Button>
        ),
      });
    }
    if (!userInfo.signedUpEvents.includes(this.state.eventInfo.eventId)) {
      this.setState({
        signUpButtonView: (
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => this.signUp()}
          >
            <Text
              style={{ fontSize: 18, color: "white", alignItems: "center" }}
            >
              Sign Up / Register
            </Text>
          </TouchableOpacity>
        ),
      });
      this.state.eventInfo.signedUp = true;
    } else {
      this.state.eventInfo.signedUp = false;
      this.setState({
        unRegister: (
          <TouchableOpacity
            style={styles.buttonUnRegister}
            onPress={() => this.unRegister()}
          >
            <Text
              style={{ fontSize: 18, color: "white", alignItems: "center" }}
            >
              Unregister
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.cardShadows}>
          <Card.Title style={styles.cardTitle}>
            {this.state.eventInfo.eventName}
          </Card.Title>
          <Card.Divider></Card.Divider>
          <View style={styles.containerView}>
            <Text style={styles.title}>Event Name: </Text>
            <Text style={styles.value}>{this.state.eventInfo.eventName}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Start Date: </Text>
            <Text style={styles.value}>{this.state.eventInfo.startDate}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>End Date: </Text>
            <Text style={styles.value}>{this.state.eventInfo.endDate}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Details: </Text>
            <Text style={styles.value}>{this.state.eventInfo.details}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Location: </Text>
            <Text style={styles.value}>{this.state.eventInfo.location}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>RSVP Code: </Text>
            <Text style={styles.value}>{this.state.eventInfo.rsvpCode}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Co-Hosts: </Text>
            <Text style={styles.value}>{this.state.eventInfo.coHosts}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Event Type: </Text>
            <Text style={styles.value}>{this.state.eventInfo.eventType}</Text>
          </View>
          <View style={styles.buttonView}>
            {this.state.signUpButtonView}
            {this.state.unRegister}
            {this.state.deleteEventView}
            {this.state.editButtonView}

            <DeleteDialog
              visible={this.state.toggleEventDeleteDialog}
              onSubmit={() => this.deleteEvent()}
              onClose={() => this.closeDialog()}
              isSubmitting={this.state.deleteLoading}></DeleteDialog>
          </View>

          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={styles.buttonComment}
              onPress={() =>
                this.props.navigation.push("EventComments", {
                  eventInfo: this.state.eventInfo,
                })
              }
            >
              <Text
                style={{ fontSize: 18, color: "#fff", alignItems: "center" }}
              >
                Comment
              </Text>
            </TouchableOpacity>
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

  value: {
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    height: 105,
    width: "100%",
    justifyContent: "space-evenly",
  },

  buttonRegister: {
    backgroundColor: "#70AF1A",
    bottom: 0,
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
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonUnRegister: {
    backgroundColor: "#006400",
    top: 0,
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
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonComment: {
    backgroundColor: "#39f077",
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
    height: 50,
    borderRadius: 30,
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

export default ViewEventScreen;
