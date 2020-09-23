import React from 'react';
import HomeScreen from '../../layout/screens/home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsStackScreen from './JobsStackNavigator';
import SettingsStackScreen from './SettingsStackNavigator';
import EventsStackScreen from './EventsStackNavigator';
import AlertsStackScreen from './AlertsStackNavigator';


const Nav = createBottomTabNavigator();

function TabNavigator()  {
  return (
    <Nav.Navigator>
      <Nav.Screen name="Home" component={HomeScreen} />
      <Nav.Screen name="Jobs" component={JobsStackScreen } />
      <Nav.Screen name="Events" component={EventsStackScreen }/>
      <Nav.Screen name="Alerts" component={AlertsStackScreen } />
      <Nav.Screen name="Settings" component={SettingsStackScreen } />
    </Nav.Navigator>
  );
}

export default TabNavigator;




