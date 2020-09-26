import React from "react";
import HomeScreen from "../../layout/screens/home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JobsStackScreen from "./JobsStackNavigator";
import SettingsStackScreen from "./SettingsStackNavigator";
import EventsStackScreen from "./EventsStackNavigator";
import AlertsStackScreen from "./AlertsStackNavigator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Nav = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Nav.Navigator>
      <Nav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Nav.Screen
        name="Jobs"
        component={JobsStackScreen}
        options={{
          tabBarLabel: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Nav.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Nav.Screen
        name="Alerts"
        component={AlertsStackScreen}
        options={{
          tabBarLabel: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Nav.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Nav.Navigator>
  );
}

export default TabNavigator;
