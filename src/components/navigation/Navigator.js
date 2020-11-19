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
    <Nav.Navigator
      tabBarOptions={{
        activeTintColor: "#006400",
        inactiveTintColor: "gray",
        style: {
          borderTopColor: "#000",
          borderTopWidth: 0.5,
          width: "100%",
          backgroundColor: "white",
          shadowColor: "rgba(0, 0, 0, 0.19)",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowRadius: 30,
          elevation: 5,
          shadowOpacity: 1,
          height: 55,
        },
        tabStyle: {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 4,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}
    >
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
