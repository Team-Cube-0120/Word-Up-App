import React, { Component } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Button,
} from "react-native";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import icon from "../../../../assets/appLogoX.png";
import { storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { DEFAULT_PROFILE_IMAGE } from "../../../enums/DefaultEnums";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Dialog from "react-native-dialog";

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

const screenWidth = Math.round(Dimensions.get("window").width);

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: "N/A",
      phoneNum: "N/A",
      username: "N/A",
      bio: "N/A",
      location: "N/A",
      gender: "N/A",
      imageUrl: DEFAULT_PROFILE_IMAGE,
      name: "N/A",
      email: "N/A",
      password: "N/A",
      confirmPassword: "N/A",
      datePosted: new Date(),
      checked: false,
      isEmailVerified: false,
      emailVerifyDialog: <View></View>,
    };
    this.passInput = React.createRef();
    this.emailInput = React.createRef();
    this.confirmInput = React.createRef();
  }

  closeDialog() {
    this.setState({ isEmailVerified: false });
  }

  storeCreds = async (user) => {
    if (user) {
      if (user.emailVerified) {
        this.setState({ emailVerifyDialog: <View></View> });
        user
          .updateProfile({
            displayName: this.state.name,
          })
          .then((s) => {
            const uid = user.uid;
            const data = {
              profile: {
                profileImageUrl: this.state.imageUrl,
                id: uid,
                email: this.state.email,
                fullname: this.state.name,
                birthday: this.state.birthday,
                phoneNum: this.state.phoneNum,
                username: this.state.username,
                bio: this.state.bio,
                location: this.state.location,
                gender: this.state.gender,
              },
              id: uid,
              email: this.state.email,
              fullname: this.state.name,
              admin: this.state.checked,
              jobIds: [],
              eventIds: [],
              signedUpEvents: [],
              alertIds: [],
              datePosted: this.state.datePosted,
              isDisabled: false,
            };
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .set(data)
              .then(async () => {
                this.setState({ name: "" });
                this.setState({ email: "" });
                this.setState({ password: "" });
                this.setState({ confirmPassword: "" });
                this.setState({ checked: false });
                await storeData(USERINFO, data).then(() => {
                  this.props.navigation.navigate("TabNavigator");
                });
              })
              .catch((error) => {
                alert(error);
              });
          });
      } else {
        alert(
          "Email not verified! Please check your email or resend for email verification."
        );
      }
    } else {
      alert("Account not found");
    }
  };

  sendEmail = async (user) => {
    user.sendEmailVerification();
  };

  onRegisterPress = () => {
    if (this.state.name.trim().length < 2) {
      alert("Name length is too short");
      return;
    }

    if (this.state.password.length < 7) {
      alert("Password length is too short");
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // console.log(res)
        res.user.sendEmailVerification();
        this.setState({
          emailVerifyDialog: (
            <View>
              <Dialog.Container visible={true}>
                <Dialog.Title
                  style={{
                    marginBottom: 5,
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: font,
                  }}
                >
                  Verification email sent!
                </Dialog.Title>
                <Dialog.Title
                  style={{
                    marginBottom: 10,
                    fontSize: 15,
                    textAlign: "center",
                    fontFamily: font,
                  }}
                >
                  Please check your email
                </Dialog.Title>
                <View style={{ flexDirection: "column" }}>
                  <Button
                    onPress={() => {
                      res.user.reload().then(() => {
                        this.storeCreds(res.user);
                      });
                    }}
                    title="Email Verified, Log Me In!"
                  ></Button>
                  <View style={{ marginTop: 10 }}>
                    <Button
                      onPress={() => {
                        this.sendEmail(res.user);
                      }}
                      title="Resend Email"
                    ></Button>
                  </View>
                </View>
              </Dialog.Container>
            </View>
          ),
        });
      })
      .catch((e) => alert(e));
  };

  render() {
    return (
      <KeyboardAwareScrollView extraScrollHeight={25} style={styles.container}>
        <Image style={styles.logo} source={icon} />
        <View style={styles.checkBoxContainer}></View>
        <Text></Text>
        <TextInput
          style={styles.topInput}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          returnKeyType={"next"}
          onSubmitEditing={() => {
            this.emailInput.current.focus();
          }}
          onChangeText={(text) => this.setState({ name: text })}
          // value={this.state.name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          blurOnSubmit={false}
        />

        <TextInput
          style={styles.input}
          ref={this.emailInput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            this.passInput.current.focus();
          }}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => this.setState({ email: text })}
          // value={this.state.email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          blurOnSubmit={false}
        />

        <TextInput
          style={styles.input}
          ref={this.passInput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            this.confirmInput.current.focus();
          }}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          // value={this.state.password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          blurOnSubmit={false}
        />

        <TextInput
          style={styles.input}
          ref={this.confirmInput}
          returnKeyType={"done"}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          // value={this.state.confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text
              onPress={() => this.props.navigation.navigate("Login")}
              style={styles.footerLink}
            >
              Log in
            </Text>
          </Text>
        </View>
        {this.state.emailVerifyDialog}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  checkBoxContainer: {
    flexDirection: "row",
    marginLeft: screenWidth / 1.7,
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 250,
    alignSelf: "center",
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
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 0,
  },
  topInput: {
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
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
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
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
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

export default RegistrationScreen;
