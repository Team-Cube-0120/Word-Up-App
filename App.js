import React, { useState } from "react";
import TabNavigator from "./src/components/navigation/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginStackScreen from "./src/components/navigation/LoginStackNavigator";
import { getData } from "./src/util/LocalStorage";
import { USERINFO } from "./src/enums/StorageKeysEnum";
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginStackNavigator"
          component={LoginStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
