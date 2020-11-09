import React from 'react';
import {Button} from 'react-native';
import EditEventScreen from '../../layout/screens/events/EditEventScreen';
import EventComments from '../../layout/screens/events/EventComments';
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
            <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} options={{title: 'New Event'}}/>
            <EventsStack.Screen name="ReviewEvents" component={ReviewEventScreen} options={{ title: 'Review' }}/>
            <EventsStack.Screen name="ViewEvent" component={ViewEventScreen} options={{ title: 'Back' }}/>
            <EventsStack.Screen name="EditEvent" component={EditEventScreen} options={{ title: 'Edit Event' }}/>
            <EventsStack.Screen name="EventComments" component={EventComments} options={{ headerLeft: null, title: 'Comment' }}/>
        </EventsStack.Navigator>
    )
}

export default EventsStackScreen;