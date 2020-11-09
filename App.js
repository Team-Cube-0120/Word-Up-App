import React, {Component, useState} from 'react';
import TabNavigator from './src/components/navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStackScreen from './src/components/navigation/LoginStackNavigator';
import { storeData, getData } from './src/util/LocalStorage'
import { firebase } from "./server/config/firebase/firebaseConfig";
import { USERINFO } from './src/enums/StorageKeysEnum';

const Stack = createStackNavigator();

// async function isLoggedIn() {
//   let userInfo = await getData(USERINFO);
//   if (userInfo != null) {

//   }
// }

class App extends Component {

  autoLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword('test1@gmail.com', 'password')
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then(async (firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            } else {
              await storeData(USERINFO, firestoreDocument.data());
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
    });
  }

  componentDidMount() {
    this.autoLogin();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="LoginStackNavigator" component={LoginStackScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

export default App;