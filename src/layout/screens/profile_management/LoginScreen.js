import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import icon from "../../../../assets/appLogoX.png";
import { storeData, getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Google from "expo-google-app-auth";

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const pass = useRef(null);
  const emailRef = useRef(null);

  const hideDialog = () => setVisible(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  useEffect(() => {
    setLoading(true);
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(async (firestoreDocument) => {
            let user = firestoreDocument.data();
            if (user.isDisabled) {
              alert("This account has been disabled");
              await firebase.auth().signOut();
              navigation.navigate("Login");
            } else {
              setEmail("");
              setPassword("");
              await storeData(USERINFO, user);
              navigation.navigate("TabNavigator");
            }
          })
          .catch(async (error) => {
            console.log(error);
            await firebase.auth().signOut();
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidStandaloneAppClientId:
          "737324073545-g3e0p7k5bflbs0str7mnrteo3hkihj5h.apps.googleusercontent.com",
        androidClientId:
          "737324073545-k2gg7rdmk5b56a4mbk133qeov3hhgiv7.apps.googleusercontent.com",
        iosStandaloneAppClientId:
          "737324073545-017bbmgjgmn4mrtp0p12qkb89jq8f3jt.apps.googleusercontent.com",
        iosClientId:
          "737324073545-vpl2snatedel1phivai07l7v6e885nhp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
      } else {
        alert("Login Unsuccessful!");
      }
    } catch (e) {
      alert(e);
    }
  };

  onSignIn = (googleUser) => {
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (response) {
              console.log("User signed in ");
              const uid = response.user.uid;
              if (response.additionalUserInfo.isNewUser) {
                const data = {
                  profile: {
                    profileImageUrl: response.user.photoURL,
                    id: uid,
                    email: response.user.email,
                    fullname: response.user.displayName,
                    birthday: "N/A",
                    phoneNum: "N/A",
                    username: "N/A",
                    bio: "N/A",
                    location: "N/A",
                    gender: "N/A",
                  },
                  id: uid,
                  email: response.user.email,
                  fullname: response.user.displayName,
                  admin: false,
                  jobIds: [],
                  eventIds: [],
                  alertIds: [],
                  signedUpEvents: [],
                  datePosted: new Date(),
                  isDisabled: false,
                };
                const usersRef = firebase.firestore().collection("users");
                usersRef
                  .doc(uid)
                  .set(data)
                  .then(async () => {
                    await storeData(USERINFO, data);
                  })
                  .then(() => {
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
              } else {
                const usersRef = firebase.firestore().collection("users");
                usersRef
                  .doc(uid)
                  .get()
                  .then(async (firestoreDocument) => {
                    if (!firestoreDocument.exists) {
                      alert("User does not exist anymore.");
                      return;
                    } else {
                      let user = firestoreDocument.data();
                      if (user.isDisabled) {
                        alert("This account has been disabled");
                      } else {
                        setEmail("");
                        setPassword("");
                        await storeData(USERINFO, user);
                        navigation.navigate("TabNavigator");
                      }
                    }
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }
            })
            .catch(function (error) {
              alert(error.message);
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
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
              let user = firestoreDocument.data();
              if (user.isDisabled) {
                alert("This account has been disabled");
              } else {
                console.log("isDisabled: " + user.isDisabled);
                setEmail("");
                setPassword("");
                await storeData(USERINFO, user);
                navigation.navigate("TabNavigator");
              }
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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" color="#70AF1A" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          extraScrollHeight={25}
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
                      fontFamily: font,
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
                    <Text
                      style={{ color: "#fff", fontSize: 18, fontFamily: font }}
                    >
                      Submit
                    </Text>
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
                  <Text
                    style={{
                      fontFamily: font,
                      color: "#fff",
                      fontSize: 20,
                      top: 5,
                    }}
                  >
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: "center", marginTop: 5 }}>
            <Text style={{ fontSize: 16, color: "gray", fontFamily: font }}>
              or{" "}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.signButton}
            onPress={() => signInWithGoogle()}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#70AF1A",
                fontWeight: "bold",
                fontFamily: font,
              }}
            >
              Sign in with Google
            </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  submitStyle: {
    backgroundColor: "#006400",
    borderRadius: 30,
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
    }),
  },
  logo: {
    flex: 1,
    height: 120,
    width: 250,
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
    fontFamily: font,
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
    fontFamily: font,
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
  signButton: {
    backgroundColor: "#FAFAFA",
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
    marginTop: 5,
    height: 48,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    fontFamily: font,
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
    fontFamily: font,
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
    fontFamily: font,
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    fontFamily: font,
    color: "#006400",
    fontWeight: "bold",
    fontSize: 16,
  },
});
