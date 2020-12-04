import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FeedbackCard from "../../../components/card/FeedbackCard";
import ApiService from "../../../service/api/ApiService";
const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class ViewFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      feedback: [],
      users: new Map(),
    };
  }

  componentDidMount() {
    this.fetchFeedback();
    this.fetchAllUsers();
  }

  fetchFeedback() {
    ApiService.get("data/getAllFeedback?collection=feedback")
      .then((feedback) => {
        this.setState({
          isLoading: false,
          feedback: feedback,
          refreshing: false,
        });
      })
      .catch((error) => {
        this.setState({
          feedback: (
            <Text style={{ fontFamily: font }}>
              Error Retrieving Data {error}
            </Text>
          ),
          refreshing: false,
        });
      });
  }

  fetchAllUsers() {
    ApiService.get("data/getAll?collection=users")
      .then(async (users) => {
        let userMap = new Map();
        users.forEach((user, index) =>
          userMap.set(user.profile.id, user.profile)
        );
        this.setState({ users: userMap });
        return;
      })
      .catch((error) => console.log("error retrieving data"));
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchFeedback();
    this.fetchAllUsers();
  }

  render() {
    let feedbackList =
      this.state.feedback.length > 0 ? (
        this.state.feedback.map((feedback, index) => (
          <TouchableOpacity key={index}>
            <FeedbackCard
              title={feedback.name}
              data={feedback}
              userInfo={this.state.users.get(feedback.userId)}
            />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>
            No Feedback available at this time
          </Text>
        </View>
      );

    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator
            size="large"
            color="#70AF1A"
            animating={this.state.isLoading}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            {feedbackList}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    // backgroundColor: "#36485f",
    backgroundColor: "gray",
  },
  header: {
    fontSize: 24,
    color: "#36485f",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "#36485f",
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  text: {
    position: "relative",
  },
  button: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 10,
  },
  btnText: {
    fontWeight: "bold",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  floatingButton: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    backgroundColor: "black",
  },
  addEventParentView: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
  },
  errorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },

  errorText: {
    fontFamily: font,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ViewFeedbackScreen;
