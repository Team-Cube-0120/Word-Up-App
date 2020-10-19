import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import icon from "../../../../assets/appLogo.png";
import { storeData, getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [visible, setVisible] = useState(false);
  const pass = useRef(null);
  const emailRef = useRef(null);

  const hideDialog = () => setVisible(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const forgotPassword = (Email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        alert("Please check your email...");
      })
      .catch(function (e) {
        alert(e);
      });
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
              setEmail("");
              setPassword("");
              await storeData(USERINFO, firestoreDocument.data());
              navigation.navigate("TabNavigator");
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={icon} />

        <TouchableOpacity
          hitSlop={{ top: 15, left: 10, right: 10 }}
          style={styles.passwordReset}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.resetText}>Forgot Password</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Modal
            isVisible={visible}
            onRequestClose={hideDialog}
            avoidKeyboard={true}
          >
            <View style={{ flex: 0, backgroundColor: "#fff" }}>
              <View
                style={{
                  height: 275,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIconsIcon
                  name="lock-reset"
                  color="#70AF1A"
                  style={styles.changePassInput}
                ></MaterialCommunityIconsIcon>
                <Text
                  style={{
                    alignItems: "center",
                    fontSize: 28,
                    fontWeight: "bold",
                    top: 2,
                  }}
                >
                  Forget Password
                </Text>
                <TextInput
                  style={styles.resetInput}
                  placeholder="Type Email to Reset"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setResetPass(text)}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.submitStyle}
                  onPress={() => {
                    if (resetPass.length > 0 && resetPass.includes("@")) {
                      forgotPassword(resetPass);
                    } else {
                      alert("Email format is incorrect. Please try again!");
                    }
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={hideDialog}
                style={{
                  backgroundColor: "#70AF1A",
                  alignItems: "center",
                  height: 35,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 20, top: 5 }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <TextInput
          style={styles.input}
          ref={emailRef}
          placeholder="Email"
          returnKeyType={"next"}
          onSubmitEditing={() => {
            pass.current.focus();
          }}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          blurOnSubmit={false}
        />

        <TextInput
          style={styles.input}
          ref={pass}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType={"done"}
        />

        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  submitStyle: {
    backgroundColor: "#006400",
    borderRadius: 5,
    height: 25,
    width: 70,
    left: 78,
    alignItems: "center",
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
    })
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
  resetInput: {
    height: 48,
    borderRadius: 5,
    width: 225,
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
    paddingLeft: 5,
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
  changePassInput: {
    fontSize: 90,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#70AF1A",
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
    marginTop: 15,
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
  passwordReset: {
    width: 150,
    ...Platform.select({
      ios: {
        left: 232,
      },
      android: {
        left: 272,
      },
      default: {
        left: 252,
      },
    }),
  },
  resetText: {
    fontSize: 14,
    color: "#039BE5",
    textDecorationLine: "underline",
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
    color: "#006400",
    fontWeight: "bold",
    fontSize: 16,
  },
});
