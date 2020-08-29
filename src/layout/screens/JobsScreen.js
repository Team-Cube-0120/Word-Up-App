
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import myIcon from '../../../assets/snack-icon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

class JobsScreen extends Component {
  render() {
    const navigation = this.props.navigation
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Hello</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateJobs')}>
            <Image
              source={myIcon}
              />
          </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white'
  },

  text: {
    position: 'relative'
  },

  addJobView: {
    position: 'absolute',
    left: 330,
    top: 620
  },

  addJob: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  floatingButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor:'black'
  },


});

export default JobsScreen;

