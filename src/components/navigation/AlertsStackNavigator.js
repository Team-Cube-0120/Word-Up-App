import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: AlertsScreen } = require("../../layout/screens/alerts/AlertsScreen");
const { default: CreateAlertsScreen } = require("../../layout/screens/alerts/CreateAlertsScreen");

const AlertsStack = createStackNavigator();

const AlertsStackScreen = () => {
    return (
        <AlertsStack.Navigator>
            <AlertsStack.Screen name="Alerts" component={AlertsScreen} />
            <AlertsStack.Screen name="CreateAlerts" component={CreateAlertsScreen} />
        </AlertsStack.Navigator>
    )
}

export default AlertsStackScreen;