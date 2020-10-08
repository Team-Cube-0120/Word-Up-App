import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: SettingsScreen } = require("../../layout/screens/profile_management/SettingsScreen");
const { default: ProfileScreen } = require("../../layout/screens/profile_management/ProfileScreen");
const { default: FeedbackScreen } = require("../../layout/screens/profile_management/FeedbackScreen");
const { default: PasswordScreen } = require("../../layout/screens/profile_management/PasswordScreen");


const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerLeft: null}}/>
            <SettingsStack.Screen name="Profile" component={ProfileScreen}/>
            <SettingsStack.Screen name="Feedback" component={FeedbackScreen}/>
            <SettingsStack.Screen name="Change Password" component={PasswordScreen}/>
        </SettingsStack.Navigator>
    )
}

export default SettingsStackScreen;
