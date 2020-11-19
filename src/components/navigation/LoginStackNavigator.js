import React from "react";
const { createStackNavigator } = require("@react-navigation/stack");
const {
  default: LoginScreen,
} = require("../../layout/screens/profile_management/LoginScreen");
const {
  default: RegistrationScreen,
} = require("../../layout/screens/profile_management/RegistrationScreen");
const {
  default: SettingsScreen,
} = require("../../layout/screens/profile_management/SettingsScreen");

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#FAFAFA",
          },
        }}
      />
      <LoginStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#FAFAFA",
          },
        }}
      />
      <LoginStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#FAFAFA",
          },
        }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginStackScreen;
