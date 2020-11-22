import React from "react";
const { createStackNavigator } = require("@react-navigation/stack");
const {
  default: SettingsScreen,
} = require("../../layout/screens/profile_management/SettingsScreen");
const {
  default: ProfileScreen,
} = require("../../layout/screens/profile_management/ProfileScreen");
const {
  default: FeedbackScreen,
} = require("../../layout/screens/profile_management/FeedbackScreen");
const {
  default: PasswordScreen,
} = require("../../layout/screens/profile_management/PasswordScreen");
const {
  default: AdminPortalScreen,
} = require("../../layout/screens/profile_management/AdminPortalScreen");
const {
  default: ManageAccountsScreen,
} = require("../../layout/screens/profile_management/ManageAccountsScreen");

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#70AF1A",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <SettingsStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: "#70AF1A",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <SettingsStack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerStyle: {
            backgroundColor: "#70AF1A",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <SettingsStack.Screen
        name="Change Password"
        component={PasswordScreen}
        options={{
          headerStyle: {
            backgroundColor: "#70AF1A",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <SettingsStack.Screen
        name="AdminPortal"
        component={AdminPortalScreen}
        options={{
          headerStyle: {
            backgroundColor: "#70AF1A",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <SettingsStack.Screen
        name="ManageAccounts"
        component={ManageAccountsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#70AF1A",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackScreen;
