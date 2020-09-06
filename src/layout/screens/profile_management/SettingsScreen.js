import React from "react";
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { firebase } from "../../../../server/config/firebase/firebaseConfig";

export default function MainScreen({navigation}) {

    const onLoginOutPress = async () => {
            try {
                await firebase.auth().signOut();
                navigation.navigate("Logout");
            } catch (e) {
                console.log(e);
            }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginOutPress()}>
                    <Text style={styles.buttonTitle}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#ffff",
    },
    title: {},
    logo: {
      flex: 1,
      height: 120,
      width: 110,
      alignSelf: "center",
      margin: 30,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        },
        default: {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        },
      }),
    },
    input: {
      height: 48,
      borderRadius: 5,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
        default: {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
          elevation: 2,
        },
      }),
      backgroundColor: "white",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
    },
    button: {
      backgroundColor: "#68a678",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
        default: {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
          elevation: 2,
        },
      }),
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: "#2e2e2d",
    },
    footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  