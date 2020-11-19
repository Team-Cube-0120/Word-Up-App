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
  LogBox,
} from "react-native";
import { Card } from "react-native-elements";
import DeleteDialog from "../../../components/dialog/DeleteDialog";
import ApiService from "../../../service/api/ApiService";
import RequestOptions from "../../../service/api/RequestOptions";
import { getData, storeData, updateUserInfo } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { FAB, Portal, Provider } from "react-native-paper";
LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

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
      isOpen: false,
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
    ApiService.delete(
      "data/events/delete?collection=events&document=" +
        itemId +
        "&userId=" +
        this.state.eventInfo.userId
    )
      .then((response) => updateUserInfo(this.state.eventInfo.userId))
      .then((response) => {
        this.closeDialog();
        Alert.alert("Notice", "Your event has been deleted", [
          {
            text: "Return",
            onPress: () => this.props.navigation.navigate("Events"),
          },
        ]);
      })
      .catch((error) => {
        this.closeDialog();
        Alert.alert(
          "Error",
          "There was a problem deleting this event. Please try again.",
          [
            {
              text: "Close",
              onPress: () => this.closeDialog(),
            },
          ]
        );
      });
  }

  async signUp() {
    alert("Succesfully Signed Up!");
    setTimeout(
      () =>
        this.props.navigation.push("SignUp", {
          eventInfo: this.state.eventInfo,
        }),
      2000
    );
  }

  async unRegister() {
    alert("Unregistered!");
    setTimeout(
      () =>
        this.props.navigation.push("SignUp", {
          eventInfo: this.state.eventInfo,
        }),
      2000
    );
  }
  async isEditable() {
    let userInfo = await getData(USERINFO);
    if (
      userInfo.admin ||
      userInfo.eventIds.includes(this.state.eventInfo.eventId)
    ) {
      this.setState({
        editButtonView: (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() =>
              this.props.navigation.push("EditEvent", {
                eventInfo: this.state.eventInfo,
              })
            }
          >
            <Text
              style={{ fontSize: 16, color: "white", alignItems: "center" }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        ),
        deleteEventView: (
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => this.openDialog()}
          >
            <Text
              style={{ fontSize: 16, color: "white", alignItems: "center" }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        ),
      });
    }
    if (!this.state.eventInfo.signedUp) {
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
      <View style={styles.container}>
        <ScrollView>
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

            <View style={{ flexDirection: "row" }}>
              {this.state.editButtonView}
              {this.state.deleteEventView}
            </View>

            <View style={styles.buttonView}>
              {this.state.signUpButtonView}
              {this.state.unRegister}
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

              <DeleteDialog
                visible={this.state.toggleEventDeleteDialog}
                onSubmit={() => this.deleteEvent()}
                onClose={() => this.closeDialog()}
                isSubmitting={this.state.deleteLoading}
              ></DeleteDialog>
            </View>
          </Card>
        </ScrollView>
      </View>
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
    height: 150,
    width: "100%",
    justifyContent: "space-evenly",
  },

  buttonRegister: {
    top: 0,
    backgroundColor: "#006400",
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
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonUnRegister: {
    top: 0,
    backgroundColor: "#006400",
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
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonComment: {
    backgroundColor: "#70AF1A",
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
    alignItems: "center",
    justifyContent: "center",
  },

  buttonEdit: {
    width: "45%",
    marginBottom: 5,
    marginRight: "10%",
    backgroundColor: "#3299eb",
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
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDelete: {
    width: "45%",
    marginBottom: 5,
    backgroundColor: "red",
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
