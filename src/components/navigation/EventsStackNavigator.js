import React from 'react';
import {Button} from 'react-native';
import EditEventScreen from '../../layout/screens/events/EditEventScreen';
import ViewEventScreen from '../../layout/screens/events/ViewEventScreen';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: EventsScreen } = require("../../layout/screens/events/EventsScreen");
const { default: CreateEventScreen } = require("../../layout/screens/events/CreateEventScreen");
const { default: ReviewEventScreen } = require("../../layout/screens/events/ReviewEventsScreen");

const EventsStack = createStackNavigator();

const EventsStackScreen = () => {
    return (
        <EventsStack.Navigator>
            <EventsStack.Screen name="Events" component={EventsScreen} options={{headerLeft: null}}/>
            <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} />
            <EventsStack.Screen name="ReviewEvents" component={ReviewEventScreen} />
            <EventsStack.Screen name="ViewEvent" component={ViewEventScreen} />
            <EventsStack.Screen name="EditEvent" component={EditEventScreen} />
        </EventsStack.Navigator>
    )
}

export default EventsStackScreen;