import React, { Fragment } from 'react';

import TabNavigator from './src/components/navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
    
  );
}


