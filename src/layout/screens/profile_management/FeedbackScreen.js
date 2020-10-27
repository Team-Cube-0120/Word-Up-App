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
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { AirbnbRating } from 'react-native-ratings';


export default function FeedbackScreen({ navigation }) {
  const [name, setName] = useState("");
  const [feedback, setfeedback] = useState("");
  const [ratings, setRatings] = useState("");

  const giveFeedback= async () => {
    alert("Thank you for your feedback!")
    const data = {
        rating: ratings,
        name: name,
        feedback: feedback
    }
    const uid = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection("feedback");
    usersRef
      .doc(uid)
      .set(data)
      .then(async () => {
        navigation.navigate("Settings");
      })
      .catch((error) => {
        alert(error);
      });
  }


  return (
    // <View>
      <KeyboardAwareScrollView
      style={styles.container}>

        <Text style={styles.changePassText}>
          We want to hear from you!
        </Text>

        <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
            defaultRating={4}
            showRating
            onFinishRating={(rating) => setRatings(rating)}
            size={40}
            />

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          returnKeyType={"done"}
        />

        <TextInput
          style={styles.inputLast}
          placeholderTextColor="#aaaaaa"
          multiline={true}
          placeholder="Tell us about your experience"
          onChangeText={(text) => setfeedback(text)}
          value={feedback}
          underlineColorAndroid="transparent"
          returnKeyType={"done"}
        />

        <TouchableOpacity style={styles.button} onPress={() => {
          if (feedback.length == 0) {
            alert("Feedback is empty! Please enter your feedback")
          } else if (name.length == 0) {
            alert("Name is empty! Please enter your name")
          }
          else {
            giveFeedback()
          }
          }}>
          <Text style={styles.buttonTitle}>Submit Feedback</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  changePassInput:{
    fontSize:140, 
    marginTop:35,
    ...Platform.select({
      ios: {
        marginLeft:115
      },
      android: {
        marginLeft:135
      },
      default: {
        marginLeft:125
      },
    }),
  },
  boxGender: {
    ...Platform.select({
      ios: {
        top: 15,
        right: 52,
        flex: 1,
        alignItems: "stretch",
      },
      android: {
        top: 15,
        right: 48,
        flex: 1,
        alignItems: "stretch",
      },
      default: {
        top: 15,
        right: 50,
        flex: 1,
        alignItems: "stretch",
      },
    }),
  },
  changePassText:{
    fontSize:28,
    marginTop:30,
    ...Platform.select({
      ios: {
        marginLeft:36
      },
      android: {
        marginLeft:42
      },
      default: {
        marginLeft:39
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
  inputLast: {
    height: 250,
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
  }
});

