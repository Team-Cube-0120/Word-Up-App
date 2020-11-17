import { Container } from "@material-ui/core";
import React, { Component, useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PasswordScreen({ navigation }) {
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const changePassword = async (currPassword, newPswrd) => {
    const user = firebase.auth().currentUser;
    try {
      // reauthenticating
      await reauthenticate(currPassword);

      await user
        .updatePassword(newPswrd)
        .then(() => {
          alert("Success! Password has been changed");
          navigation.navigate("Settings");
        })
        .catch((e) => console.log(e));
    } catch (err) {
      alert("Current Password " + err);
    }
  };

  const reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  return (
    // <View>
    <KeyboardAwareScrollView extraScrollHeight={25} style={styles.container}>
      <MaterialCommunityIconsIcon
        name="lock-reset"
        color="#70AF1A"
        style={styles.changePassInput}
      ></MaterialCommunityIconsIcon>

      <Text style={styles.changePassText}>Change Your Password</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Current Password"
        onChangeText={(text) => setcurrentPassword(text)}
        value={currentPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        returnKeyType={"done"}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="New Password"
        onChangeText={(text) => setnewPassword(text)}
        value={newPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        returnKeyType={"done"}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(text) => setconfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        returnKeyType={"done"}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (newPassword != confirmPassword) {
            alert("New and confirmed password don't match. Please try again.");
          } else {
            Alert.alert(
              "Are you sure?",
              "Please confirm your password change",
              [
                {
                  text: "Confirm",
                  onPress: () => changePassword(currentPassword, newPassword),
                },
                {
                  text: "Cancel",
                  onPress: "",
                },
              ]
            );
          }
        }}
      >
        <Text style={styles.buttonTitle}>Change Password</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  changePassInput: {
    fontSize: 140,
    marginTop: 35,
    ...Platform.select({
      ios: {
        marginLeft: 115,
      },
      android: {
        marginLeft: 135,
      },
      default: {
        marginLeft: 125,
      },
    }),
  },
  changePassText: {
    fontSize: 28,
    ...Platform.select({
      ios: {
        marginLeft: 48,
      },
      android: {
        marginLeft: 55,
      },
      default: {
        marginLeft: 52,
      },
    }),
  },
  logo: {
    flex: 1,
    height: 120,
    width: 140,
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
    height: 50,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width: 315,
      },
      android: {
        elevation: 2,
        width: 345,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        width: 320,
      },
    }),
    backgroundColor: "white",
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#70AF1A",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width: 315,
      },
      android: {
        elevation: 2,
        width: 345,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        width: 320,
      },
    }),
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
