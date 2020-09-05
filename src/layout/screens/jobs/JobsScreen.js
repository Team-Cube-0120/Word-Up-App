
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import plusIcon from '../../../../assets/plus-icon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

class JobsScreen extends Component {
  render() {
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
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

