import React from 'react';
import EditJobScreen from '../../layout/screens/jobs/EditJobScreen';
import ViewJobScreen from '../../layout/screens/jobs/ViewJobScreen';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: JobsScreen } = require("../../layout/screens/jobs/JobsScreen");
const { default: CreateJobScreen } = require("../../layout/screens/jobs/CreateJobScreen");
const { default: ReviewJobScreen } = require("../../layout/screens/jobs/ReviewJobScreen");


const JobsStack = createStackNavigator();

const JobsStackScreen = () => {
    return (
        <JobsStack.Navigator>
            <JobsStack.Screen name="Jobs" component={JobsScreen} options={{headerLeft: null}}/>
            <JobsStack.Screen name="CreateJobs" component={CreateJobScreen} />
            <JobsStack.Screen name="ReviewJobs" component={ReviewJobScreen} />
            <JobsStack.Screen name="ViewJob" component={ViewJobScreen} />
            <JobsStack.Screen name="EditJob" component={EditJobScreen} />
        </JobsStack.Navigator>
    )
}

export default JobsStackScreen;