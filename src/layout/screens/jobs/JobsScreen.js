
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import plusIcon from '../../../../assets/plus-icon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JobCard from '../../../components/card/JobCard';
import ApiService from '../../../service/api/ApiService';

class JobsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      jobs: []
    }
  }

  componentDidMount() {
    this.fetchAllJobs();
  }

  fetchAllJobs() {
    ApiService.get('data/getAll?collection=jobs')
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs, refreshing: false })
      })
      .catch((error) => {
        this.setState({ jobs: <Text>Error Retrieving Data {error}</Text>, refreshing: false })
      })
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchAllJobs();
  }

  render() {
    const navigation = this.props.navigation
    let jobList =
      (this.state.jobs.length > 0) ?
        this.state.jobs.map((job, index) =>
          <TouchableOpacity 
            key={index}
            onPress={() => this.props.navigation.push("ViewJob", {jobInfo: job})}>
              <JobCard title={job.position} data={job} />
          </TouchableOpacity>)
        : <Text>Error Retrieving Data</Text>

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={this.state.isLoading} />
        </View>)
    }

    return (
      <View style={styles.container}>
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
      </View>
    );
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
});

export default JobsScreen;

