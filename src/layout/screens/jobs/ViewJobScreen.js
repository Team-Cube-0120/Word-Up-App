import { Height } from "@material-ui/icons";
import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Image,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
  LogBox
} from "react-native";
import DeleteDialog from "../../../components/dialog/DeleteDialog";
import { Card, Avatar } from "react-native-elements";
import { formatToMMDDYYYY } from "../../../formatter/TimeFormatter";
import ApiService from "../../../service/api/ApiService";
import { getData, storeData, updateUserInfo } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

class ViewJobScreen extends Component {
  constructor(props) {
    super(props);
    let jobInfo = this.props.route.params.jobInfo;
    let userInfo = this.props.route.params.userInfo;
    this.state = {
      jobInfo: jobInfo,
      userInfo: userInfo,
      editButtonView: null,
      deleteButtonView: null,
      deleteDialogVisible: false,
      deleteLoading: false,
      datePosted: formatToMMDDYYYY(jobInfo.datePosted._seconds),
    };
  }

  componentDidMount() {
    this.isJobCreator();
    this.props.navigation.setOptions({
      title: "View Job",
    });
  }

  async isJobCreator() {
    let loggedInUser = await getData(USERINFO);
    if (
      loggedInUser.admin ||
      loggedInUser.jobIds.includes(this.state.jobInfo.jobId)
    ) {
      this.setState({
        editButtonView: (
          <Button
            style={styles.buttonRight}
            title="Edit"
            onPress={() =>
              this.props.navigation.push("EditJob", {
                jobInfo: this.state.jobInfo,
              })
            }
          ></Button>
        ),
        deleteButtonView: (
          <Button
            style={styles.buttonRight}
            color={"red"}
            title="Delete"
            onPress={() => this.openDialog()}
          ></Button>
        ),
      });
    }
  }

  async deleteJob() {
    let itemId = this.state.jobInfo.jobId;
    this.setState({ deleteLoading: true });
    ApiService.delete(
      "data/jobs/delete?collection=jobs&document=" +
        itemId +
        "&userId=" +
        this.state.jobInfo.userId
    )
      .then((response) => updateUserInfo())
      .then((response) => {
        this.closeDialog();
        Alert.alert("Notice", "Your job has been deleted", [
          {
            text: "Return",
            onPress: () => this.props.navigation.navigate("Jobs"),
          },
        ]);
      })
      .catch((error) => {
        this.closeDialog();
        Alert.alert(
          "Error",
          "There was a problem deleting this job. Please try again.",
          [
            {
              text: "Close",
              onPress: () => this.closeDialog(),
            },
          ]
        );
      });
  }

  applyToJob() {
    Linking.canOpenURL(this.state.jobInfo.jobAppUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(this.state.jobInfo.jobAppUrl);
        } else {
          alert("Unable to apply to this job. Check the application link to "
            + "see if it is still valid or in the proper format (example: http://google.com)");
        }
      });
  }

  openDialog() {
    this.setState({ deleteDialogVisible: true });
  }

  closeDialog() {
    this.setState({ deleteDialogVisible: false, deleteLoading: false });
  }

  render() {
    return (
      <ScrollView>
        <Card containerStyle={styles.cardShadows}>
          {/* <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={styles.companyImage}
          /> */}
          <Text style={styles.jobTitle}>{this.state.jobInfo.position}</Text>
          <Text style={styles.companyTitle}>{this.state.jobInfo.company}</Text>
          <Text style={styles.jobTypeText}>{this.state.jobInfo.jobType}</Text>
          <View style={styles.locationView}>
            <Image
              source={require("../../../../assets/location_icon.jpg")}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>
              {this.state.jobInfo.city}, {this.state.jobInfo.state}
            </Text>
          </View>
          <View style={styles.buttonRight}>{this.state.editButtonView}</View>
          <View style={styles.buttonRight}>{this.state.deleteButtonView}</View>
          <DeleteDialog
            visible={this.state.deleteDialogVisible}
            onClose={() => this.closeDialog()}
            onSubmit={() => this.deleteJob()}
            isSubmitting={this.state.deleteLoading}
          ></DeleteDialog>
          <View style={styles.buttonLeft}>
            <Button
              color="#70AF1A"
              title="Apply"
              disabled={false}
              onPress={() => this.applyToJob()}
            />
          </View>
          <Card.Divider></Card.Divider>
          <Text style={styles.datePostedText}>
            Posted {this.state.datePosted}
          </Text>
        </Card>
        <Card>
          <Card.Title style={styles.cardTitle}>Job Description</Card.Title>
          <Text style={styles.value}>{this.state.jobInfo.jobDescription}</Text>
        </Card>
        <Card>
          <Card.Title style={styles.cardTitle}>About the Company</Card.Title>
          <View style={styles.containerView}>
            <Text style={styles.title}>Job Application URL: </Text>
            <Text style={styles.value}>{this.state.jobInfo.jobAppUrl}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Email: </Text>
            <Text style={styles.value}>{this.state.jobInfo.email}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Phone Number: </Text>
            <Text style={styles.value}>{this.state.jobInfo.phoneNumber}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Street: </Text>
            <Text style={styles.value}>{this.state.jobInfo.street}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>City: </Text>
            <Text style={styles.value}>{this.state.jobInfo.city}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>State: </Text>
            <Text style={styles.value}>{this.state.jobInfo.state}</Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.title}>Zip: </Text>
            <Text style={styles.value}>{this.state.jobInfo.zip}</Text>
          </View>
        </Card>
        <Card style={styles.lastCard}>
          <Card.Title style={styles.cardTitle}>Job Poster</Card.Title>
          <View style={styles.profileImage}>
            <Avatar
              rounded
              source={{
                uri: this.state.userInfo.profileImageUrl,
              }}
            />
            <Text style={styles.profileTitle}>
              {this.state.userInfo.fullname}
            </Text>
          </View>
        </Card>
        <View style={styles.adjustBottomMargin}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    marginBottom: "3%",
  },

  cardTitle: {
    textAlign: "left",
  },

  title: {
    fontWeight: "bold",
  },

  jobTitle: {
    fontWeight: "bold",
    marginTop: "2%",
    fontSize: 20,
  },

  companyTitle: {
    fontWeight: "200",
    // marginTop: '1%',
    fontSize: 16,
  },

  value: {
    fontSize: 16,
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: "5%",
    marginBottom: "5%",
  },

  buttonLeft: {
    marginBottom: "5%",
  },

  buttonRight: {
    marginBottom: "5%",
  },

  companyImage: {
    height: 50,
    width: 50,
  },

  locationView: {
    flexDirection: "row",
    right: "1%",
    marginBottom: "5%",
  },

  locationIcon: {
    marginTop: "1%",
    height: 12,
    width: 12,
  },

  locationText: {
    marginLeft: "1%",
  },

  datePostedText: {
    textAlign: "right",
    fontSize: 12,
    fontStyle: "italic",
  },

  profileImage: {
    textAlign: "left",
    flexDirection: "row",
    marginBottom: "5%",
  },

  profileTitle: {
    marginLeft: "3%",
    marginTop: "2%",
  },

  adjustBottomMargin: {
    marginTop: "5%",
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

export default ViewJobScreen;
