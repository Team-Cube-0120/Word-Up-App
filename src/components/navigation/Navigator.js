import React from 'react';
import HomeScreen from '../../layout/screens/home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsStackScreen from './JobsStackNavigator';
import SettingsScreen from '../../layout/screens/profile_management/SettingsScreen';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import EventsScreen from '../../layout/screens/events/EventsScreen';

// const TabNavigator = createMaterialBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         tabBarLabel: 'Home',
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
//           </View>
//         ),
//       },
//     },

//     Settings: {
//       screen: SettingsScreen,
//       navigationOptions: {
//         tabBarLabel: 'Settings',
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icon
//               style={[{ color: tintColor }]} size={25} name={'ios-settings'} />
//           </View>
//         ),

//       },
//     },

//     Jobs: {
//       screen: JobsStackScreen,
//       navigationOptions: {
//         tabBarLabel: 'Jobs',
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icon style={[{ color: tintColor }]} size={25} name={'ios-book'} />
//           </View>
//         ),
//       },
//     },

//     Events: {
//       screen: EventsScreen,
//       navigationOptions: {
//         tabBarLabel: 'Events',
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icon
//               style={[{ color: tintColor }]} size={25} name={'ios-settings'} />
//           </View>
//         ),
//       },
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     activeColor: '#f0edf6',
//     inactiveColor: '#226557',
//     barStyle: { backgroundColor: '#f69b31' },
//   }
// );

const Nav = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen name="Home" component={HomeScreen} />
      <Nav.Screen name="Jobs" component={JobsStackScreen } />
      <Nav.Screen name="Events" component={EventsScreen } />
      <Nav.Screen name="Settings" component={SettingsScreen } />

      {/* <Screen HERE PAVAN> */}

    </Nav.Navigator>
  )
}

export default TabNavigator;




