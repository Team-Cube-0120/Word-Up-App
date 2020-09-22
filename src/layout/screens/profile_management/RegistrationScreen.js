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
} from "react-native";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import icon from "../../../../assets/icon2.png";

class RegistrationScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.passInput = React.createRef()
    this.emailInput = React.createRef()
    this.confirmInput = React.createRef()
  }

  onRegisterPress = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Home");
          })
          .catch((error) => {
            alert(error);
          });
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
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.emailInput.current.focus();
            }}
            onChangeText={(text) => this.setState({name:text})}
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
            onChangeText={(text) => this.setState({email:text})}
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
            onChangeText={(text) => this.setState({password:text})}
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
            onChangeText={(text) => this.setState({confirmPassword:text})}
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
              <Text onPress={() => this.props.navigation.navigate("Login")} style={styles.footerLink}>
                Log in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
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
    margin: 30,
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

export default RegistrationScreen;
