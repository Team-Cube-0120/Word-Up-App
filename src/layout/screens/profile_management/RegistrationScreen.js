import React, { Component } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import icon from "../../../../assets/icon2.png";
import { storeData } from "../../../util/LocalStorage";
import { USERINFO } from '../../../enums/StorageKeysEnum';

const screenWidth = Math.round(Dimensions.get("window").width);

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      checked: false
    };
    this.passInput = React.createRef();
    this.emailInput = React.createRef();
    this.confirmInput = React.createRef();
  }

  onRegisterPress = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        if (response.user) {
          response.user
            .updateProfile({
              displayName: this.state.name,
            })
            .then((s) => {
              const uid = response.user.uid;
              const data = {
                id: uid,
                email: this.state.email,
                fullname: this.state.name,
                admin: this.state.checked,
              };
              this.storeData(this.state.checked)
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
                  await storeData(USERINFO, data);
                  this.props.navigation.navigate("TabNavigator");
                })
                .catch((error) => {
                  alert(error);
                });
            });
        } else {
          alert("Account not found");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always"
        >
          <Image style={styles.logo} source={icon} />
          <View style={styles.checkBoxContainer}>
            <Text
              style={{
                top: 18,
                marginLeft: screenWidth / 10,
                fontWeight: "bold",
              }}
            >
              Admin
            </Text>
            <CheckBox
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            ></CheckBox>
          </View>
          <TextInput
            style={styles.topInput}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.emailInput.current.focus();
            }}
            onChangeText={(text) => this.setState({ name: text })}
            value={this.state.name}
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
            value={this.state.email}
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
            value={this.state.password}
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
            value={this.state.confirmPassword}
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkBoxContainer: {
    flexDirection: "row",
    marginLeft: screenWidth / 1.7,
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 110,
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
    backgroundColor: "#175377",
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

export default RegistrationScreen;
