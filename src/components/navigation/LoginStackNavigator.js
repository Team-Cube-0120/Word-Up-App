import React from 'react';
const { createStackNavigator } = require("@react-navigation/stack");
const { default: LoginScreen } = require("../../layout/screens/LoginScreen");
const { default: RegistrationScreen } = require("../../layout/screens/RegistrationScreen");

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="Registration" component={RegistrationScreen} />
        </LoginStack.Navigator>
    )
}

export default LoginStackScreen;
