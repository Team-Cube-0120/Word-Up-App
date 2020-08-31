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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        alert("here");
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
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
            placeholder="Email"
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.password.focus();
            }}
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
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            returnKeyType={"done"}
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
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
        </CardView>
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
    backgroundColor: "#ffff",
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
