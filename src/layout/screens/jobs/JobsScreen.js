import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import plusIcon from "../../../../assets/plus-icon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import JobCard from "../../../components/card/JobCard";
import ApiService from "../../../service/api/ApiService";
import profileImage from "../../../../assets/profile.png";
import { FAB } from "react-native-paper";

class JobsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      jobs: [],
    };
  }

  componentDidMount() {
    this.fetchAllJobs();
  }

  fetchAllJobs() {
    ApiService.get("data/getAll?collection=jobs")
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          jobs: <Text>Error Retrieving Data {error}</Text>,
          refreshing: false,
        });
      });
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchAllJobs();
  }

  render() {
    const navigation = this.props.navigation;
    let jobList =
      this.state.jobs.length > 0 ? (
        this.state.jobs.map((job, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.props.navigation.push("ViewJob", { jobInfo: job })
            }
          >
            <JobCard title={job.position} data={job} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>Error Retrieving Data</Text>
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
    }

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
          {jobList}
        </ScrollView>

        <FAB
          style={styles.fab}
          medium
          animated={true}
          color="#fff"
          icon="plus"
          theme={{ colors: { accent: "#70AF1A" } }}
          onPress={() => navigation.navigate("CreateJobs")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
});

export default JobsScreen;
