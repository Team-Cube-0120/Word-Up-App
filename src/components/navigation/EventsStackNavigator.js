import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: EventsScreen } = require("../../layout/screens/events/EventsScreen");
const { default: CreateEventScreen } = require("../../layout/screens/events/CreateEventScreen");
const { default: ReviewEventScreen } = require("../../layout/screens/events/ReviewEventsScreen");

const EventsStack = createStackNavigator();

const EventsStackScreen = () => {
    return (
        <EventsStack.Navigator>
            <EventsStack.Screen name="Events" component={EventsScreen} />
            <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} />
            <EventsStack.Screen name="ReviewEvents" component={ReviewEventScreen} />
        </EventsStack.Navigator>
    )
}

export default EventsStackScreen;