
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import plusIcon from '../../../../assets/plus-icon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JobCard from '../../../components/card/JobCard';
import ApiService from '../../../service/api/ApiService';
import FilterJobDialog from '../../../components/dialog/FilterJobDialog';
import { ALL_TIME } from '../../../enums/FilterOptionsEnum';
import { formatFilterOption } from '../../../formatter/FilterJobsFormatter'
import sleep from '../../../util/Thread'

class JobsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      jobs: [],
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: ALL_TIME
    }
  }

  componentDidMount() {
    this.fetchJobs();
    this.fetchAllUsers();
  }

  fetchJobs() {
    if (this.state.filterOption == ALL_TIME) {
      this.fetchAllJobs();
    } else {
      this.fetchFilteredJobs();
    }
  }

  fetchAllJobs() {
    ApiService.get('data/getAll?collection=jobs')
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false })
      })
      .catch((error) => {
        this.setState({ jobs: <Text>Error Retrieving Data {error}</Text>, isLoading: false, refreshing: false })
      })
  }

  async fetchFilteredJobs() {
    let formattedFilterOption = await formatFilterOption(this.state.filterOption);
    ApiService.get('data/filter/get?collection=jobs&filterOption=' + formattedFilterOption)
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false })
      })
      .catch((error) => {
        this.setState({ jobs: <Text>Error Retrieving Data {error}</Text>, isLoading: false, refreshing: false })
      })
  }

  async filterJobs(selectedValue) {
    this.setState({ filterOption: selectedValue, isLoading: true }, () => {
      this.closeFilterDialog();
      this.fetchJobs();
    });
  }

  fetchAllUsers() {
    ApiService.get('data/getAll?collection=users')
      .then(async (users) => {
        let userMap = new Map();
        users.forEach((user, index) => userMap.set(user.profile.id, user.profile));
        this.setState({ users: userMap });
        return;
      })
      .catch((error) => console.log("error retrieving data"))
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
    const navigation = this.props.navigation
    let jobList =
      (this.state.jobs.length > 0 && this.state.users.size > 0) ?
        this.state.jobs.map((job, index) =>
          <TouchableOpacity
            key={index}
            onPress={() => this.props.navigation.push("ViewJob", { jobInfo: job, userInfo: this.state.users.get(job.userId) })}>
            <JobCard title={job.position} data={job} userInfo={this.state.users.get(job.userId)} />
          </TouchableOpacity>)
        : <Text>Error Retrieving Data</Text>

    if (this.state.isLoading) {
      console.log("showing activity indicator" + this.state.isLoading);
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#0000ff" animating={this.state.isLoading} />
        </View>)
    } else {
      return (
        <View style={styles.container}>
          <View styles={styles.filterIconView}>
            <TouchableOpacity
              onPress={() => this.openFilterDialog()}>
              <Image
                style={styles.filterIcon}
                source={require('../../../../assets/filter_icon.png')} />
            </TouchableOpacity>
          </View>

          <ScrollView
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}>
            {jobList}
          </ScrollView>

          <View style={styles.addJobParentView}>
            <TouchableOpacity
              style={styles.touchableOpacityView}
              onPress={() => navigation.navigate('CreateJobs')}>
              <Image
                style={styles.floatingButton}
                source={plusIcon}
              />
            </TouchableOpacity>
          </View>

          <FilterJobDialog
            onSubmit={(selectedValue) => this.filterJobs(selectedValue)}
            onClose={() => this.closeFilterDialog()}
            filterOption={this.state.filterOption}
            visible={this.state.isFilterDialogOpen}></FilterJobDialog>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 24,
    color: '#36485f',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: '#36485f',
    borderBottomWidth: 1,
    alignSelf: "center",
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center'
  }, 

  addJobParentView: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },

  touchableOpacityView: {
    width: 75,
    height: 75,
  },

  floatingButton: {
    position: 'absolute',
    width: 75,
    height: 75
  },

  filterIcon: {
    height: 40,
    width: 40
  },

  filterIconView: {
    alignSelf: 'flex-end',
    height: 40,
    width: 40
  }
});

export default JobsScreen;

