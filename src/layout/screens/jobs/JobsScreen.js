
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import plusIcon from '../../../../assets/plus-icon.png';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import JobCard from '../../../components/card/JobCard';
import ApiService from '../../../service/api/ApiService';

class JobsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      jobs: []
    }
  }

  componentDidMount() {
    ApiService.get('data/jobs/getAll?collection=jobs')
      .then((jobs) => {
        this.setState({ isLoading: false, jobs: jobs })
      })
      .catch((error) => {
        this.setState({ jobs: <Text>Error Retrieving Data {error}</Text> })
      })
  }

  render() {
    const navigation = this.props.navigation
    let jobList = this.state.jobs.map((job, index) =>
        <TouchableOpacity key={index}>
          <JobCard title={job.position} data={job} />
        </TouchableOpacity>)

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={this.state.isLoading} />
        </View>)
    }

    return (
      <View style={styles.container}>
        <ScrollView>
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
    marginBottom: 20
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

