
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import myIcon from '../../../../assets/snack-icon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

class EventsScreen extends Component {
  render() {
    const navigation = this.props.navigation
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Event Screen</Text>
          <TouchableOpacity style = {styles.button}
            onPress={() => navigation.navigate('CreateEvent')}>
            <Text style = {styles.btnText}>Create Event</Text>
          </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding:20
  },
  header: {
    fontSize: 24,
    color: '#36485f',
    paddingBottom: 10,
    marginBottom:20,
    borderBottomColor: '#36485f',
    borderBottomWidth: 1,
    alignSelf: "center",
    },
  text: {
    position: 'relative'
  },
  button: {
    alignItems:"center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: "bold"
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

export default EventsScreen;

