import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import JobCard from "../../../components/card/JobCard";
import ApiService from "../../../service/api/ApiService";
import profileImage from "../../../../assets/profile.png";
import { FAB } from "react-native-paper";
import React, { Component } from "react";
import FilterJobDialog from "../../../components/dialog/FilterJobDialog";
import { getData } from "../../../util/LocalStorage";
import { ALL_TIME, MY_JOBS } from "../../../enums/FilterOptionsEnum";
import { formatFilterOption } from "../../../formatter/FilterJobsFormatter";
import { USERINFO } from "../../../enums/StorageKeysEnum";

class JobsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      jobs: [],
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: ALL_TIME,
    };
  }

  componentDidMount() {
    this.fetchJobs();
    this.fetchAllUsers();
    this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      () => {
        this.fetchJobs();
        this.fetchAllUsers();
      }
    );
  }

  fetchJobs() {
    if (this.state.filterOption == ALL_TIME) {
      this.fetchAllJobs();
    } else {
      this.fetchFilteredJobs();
    }
  }

  fetchAllJobs() {
    ApiService.get("data/getAll?collection=jobs")
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          jobs: <Text>Error Retrieving Data {error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async fetchFilteredJobs() {
    if (this.state.filterOption == MY_JOBS) {
      this.filterByOther();
    } else {
      this.filterByDate();
    }
  }

  async filterByOther() {
    let userInfo = await getData(USERINFO);
    let formattedFilterOption = userInfo.id;
    ApiService
      .get("data/filter/other/get?collection=jobs&filterOption=" + formattedFilterOption)
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          jobs: <Text>Error Retrieving Data {error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async filterByDate() {
    let formattedFilterOption = await formatFilterOption(this.state.filterOption);
    ApiService
      .get("data/filter/date/get?collection=jobs&filterOption=" + formattedFilterOption)
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          jobs: <Text>Error Retrieving Data {error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async filterJobs(selectedValue) {
    this.setState({ filterOption: selectedValue, isLoading: true, isFilterDialogOpen: false }, () => {
      this.fetchJobs();
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
    this.fetchJobs();
    this.fetchAllUsers();
  }

  openFilterDialog() {
    this.setState({ isFilterDialogOpen: true });
  }

  closeFilterDialog() {
    this.setState({ isFilterDialogOpen: false });
  }

  render() {
    const navigation = this.props.navigation;
    let jobList =
      this.state.jobs.length > 0 && this.state.users.size > 0 ? (
        this.state.jobs.map((job, index) => (
          <TouchableOpacity
            style={styles.cardShadows}
            key={index}
            onPress={() =>{
              this.props.navigation.push("ViewJob", {
                jobInfo: job,
                userInfo: this.state.users.get(job.userId),
              })}
            }
          >
            <JobCard
              title={job.position}
              data={job}
              userInfo={this.state.users.get(job.userId)}
            />
          </TouchableOpacity>
        ))
      ) : (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>No jobs available at this time</Text>
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
            {jobList}
          </ScrollView>

          <FAB
            style={styles.filter}
            medium
            animated={true}
            color="#fff"
            icon="filter"
            theme={{ colors: { accent: "#70AF1A" } }}
            onPress={() => this.openFilterDialog()}
          />
          <FAB
            style={styles.fab}
            medium
            animated={true}
            color="#fff"
            icon="plus"
            theme={{ colors: { accent: "#006400" } }}
            onPress={() => navigation.navigate("CreateJobs")}
          />

          <FilterJobDialog
            onSubmit={(selectedValue) => this.filterJobs(selectedValue)}
            onClose={() => this.closeFilterDialog()}
            filterOption={this.state.filterOption}
            visible={this.state.isFilterDialogOpen}
          ></FilterJobDialog>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#FAFAFA",
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },

  errorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },

  errorText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  addJobParentView: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
  },

  touchableOpacityView: {
    width: 75,
    height: 75,
  },

  floatingButton: {
    position: "absolute",
    width: 75,
    height: 75,
  },

  filter: {
    position: "absolute",
    margin: 16,
    right: 0,
    ...Platform.select({
      ios: {
        bottom: "9.5%",
      },
      android: {
        bottom: "11%",
      },
      default: {
        bottom: "11%",
      },
    }),
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

export default JobsScreen;
