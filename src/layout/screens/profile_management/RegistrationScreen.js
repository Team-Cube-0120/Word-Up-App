import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { firebase } from "../../../../server/firebase/firebaseConfig";
import icon from "../../../../assets/icon2.png";
import CardView from "react-native-cardview";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <CardView
          style={styles.cardStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
        >
          <Image style={styles.logo} source={icon} />
        </CardView>
        <CardView
          style={styles.cardStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
        >
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.email.focus();
            }}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            blurOnSubmit={false}
          />
        </CardView>
        <CardView
          style={styles.cardStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
        >
          <TextInput
            style={styles.input}
            ref={(input) => { this.email = input; }}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.password.focus();
            }}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            blurOnSubmit={false}
          />
        </CardView>
        <CardView
          style={styles.cardStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
        >
          <TextInput
            style={styles.input}
            ref={(input) => { this.password = input; }}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.confirm.focus();
            }}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            blurOnSubmit={false}
          />
        </CardView>
        <CardView
          style={styles.cardStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
        >
          <TextInput
            style={styles.input}
            ref={(input) => { this.confirm = input; }}
            returnKeyType={"done"}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </CardView>
        <CardView
          style={styles.cardStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}
          >
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
        </CardView>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
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
    backgroundColor: "#fff",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 110,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#68a678",
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
