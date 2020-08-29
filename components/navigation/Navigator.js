import React from 'react';
import {  View } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import JobsScreen from '../screens/JobsScreen';
import EventsScreen from '../screens/EventsScreen';

const TabNavigator = createMaterialBottomTabNavigator(
  { 
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
          </View>
        ),
      },
    },

    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]} size={25} name={'ios-settings'} />
          </View>
        ),
       
      },
    },

    Jobs: {
      screen: JobsScreen,
      navigationOptions: {
        tabBarLabel: 'Jobs',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-book'} />
          </View>
        ),
      },
    },

    Events: {
      screen: EventsScreen,
      navigationOptions: {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-book'} />
          </View>
        ),
      },
    },

  },

     
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: { backgroundColor: '#f69b31' },
  }
);

export default createAppContainer(TabNavigator);





