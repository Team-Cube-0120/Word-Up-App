import React from 'react';
import ReviewAlertsScreen from '../../layout/screens/alerts/ReviewAlertsScreen';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: AlertsScreen } = require("../../layout/screens/alerts/AlertsScreen");
const { default: CreateAlertsScreen } = require("../../layout/screens/alerts/CreateAlertsScreen");

const AlertsStack = createStackNavigator();

const AlertsStackScreen = () => {
    return (
        <AlertsStack.Navigator>
            <AlertsStack.Screen name="Alerts" component={AlertsScreen} options={{headerLeft: null}}/>
            <AlertsStack.Screen name="CreateAlerts" component={CreateAlertsScreen} options={{title: 'New Alert'}} />
            <AlertsStack.Screen name="ReviewAlerts" component={ReviewAlertsScreen} options={{title: 'Review'}} />
        </AlertsStack.Navigator>
    )
}

export default AlertsStackScreen;