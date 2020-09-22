import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: SettingsScreen } = require("../../layout/screens/profile_management/SettingsScreen");
const { default: ProfileScreen } = require("../../layout/screens/profile_management/ProfileScreen");


const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
            <SettingsStack.Screen name="Edit Profile" component={ProfileScreen}/>
        </SettingsStack.Navigator>
    )
}

export default SettingsStackScreen;
