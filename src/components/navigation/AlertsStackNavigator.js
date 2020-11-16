import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: AlertsScreen } = require("../../layout/screens/alerts/AlertsScreen");
const { default: CreateAlertsScreen } = require("../../layout/screens/alerts/CreateAlertsScreen");
import ViewAlertScreen from '../../layout/screens/alerts/ViewAlertScreen';
import EditAlertScreen from '../../layout/screens/alerts/EditAlertScreen';
const { default: ReviewAlertsScreen } = require("../../layout/screens/alerts/ReviewAlertsScreen");




const AlertsStack = createStackNavigator();

const AlertsStackScreen = () => {
    return (
        <AlertsStack.Navigator>
            <AlertsStack.Screen name="Alerts" component={AlertsScreen} options={{headerLeft: null}}/>
            <AlertsStack.Screen name="CreateAlerts" component={CreateAlertsScreen} options={{title: 'New Alert'}} />
            <AlertsStack.Screen name="ReviewAlerts" component={ReviewAlertsScreen} options={{title: 'Review'}} />
            <AlertsStack.Screen name="ViewAlert" component={ViewAlertScreen} options={{ title: 'Back' }}/>
            <AlertsStack.Screen name="EditAlert" component={EditAlertScreen} options={{ title: 'Edit Alert' }}/>

        </AlertsStack.Navigator>
    )
}

export default AlertsStackScreen;