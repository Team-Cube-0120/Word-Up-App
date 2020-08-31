import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: JobsScreen } = require("../../layout/screens/jobs/JobsScreen");
const { default: CreateJobScreen } = require("../../layout/screens/jobs/CreateJobScreen");

const JobsStack = createStackNavigator();

const JobsStackScreen = () => {
    return (
        <JobsStack.Navigator>
            <JobsStack.Screen name="Jobs" component={JobsScreen} />
            <JobsStack.Screen name="CreateJobs" component={CreateJobScreen} />
        </JobsStack.Navigator>
    )
}

export default JobsStackScreen;