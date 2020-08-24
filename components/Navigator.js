import React from 'react';
import {  View } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import JobsScreen from './JobsScreen';

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


  },

     
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: { backgroundColor: '#f69b31' },
  }
);

export default createAppContainer(TabNavigator);





