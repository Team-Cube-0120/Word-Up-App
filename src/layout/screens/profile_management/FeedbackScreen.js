import React, { Component, useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  View,
  Keyboard
} from "react-native";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-rating-element";
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

export default function FeedbackScreen({ navigation }) {
  const [name, setName] = useState("");
  const [feedback, setfeedback] = useState("");
  const [ratings, setRatings] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [userID, setUserID] = useState("");
  const [count, setCount] = useState(5);

  useEffect(() => {
    getUserInfo().catch((e) => alert(e));
  });

  const getUserInfo = async () => {
    let userInfo = await getData(USERINFO);
    setName(userInfo.profile.fullname);
    setProfileImg(userInfo.profile.profileImageUrl);
    setUserID(userInfo.id);
  };

  const giveFeedback = async () => {
    alert("Thank you for your feedback!");
    const data = {
      rating: count,
      name: name,
      feedback: feedback,
      profileImg: profileImg,
      userId: userID,
    };
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
  };

  return (
    // <View>
    <KeyboardAwareScrollView extraScrollHeight={25} style={styles.container}>
      <Text style={styles.changePassText}>We want to hear from you!</Text>

      <Rating
        rated={count}
        totalCount={5}
        ratingColor="#f1c644"
        ratingBackgroundColor="#d4d4d4"
        size={50}
        onIconTap={(position) => setCount(position)}
        icon="ios-star"
        direction="row"
      />

      <TextInput
        style={styles.input}
        value={name}
        editable={false}
        underlineColorAndroid="transparent"
        blurOnSubmit={true}
        onSubmitEditing={()=>{Keyboard.dismiss()}}
      />

      <TextInput
        style={styles.inputLast}
        placeholderTextColor="#aaaaaa"
        textAlignVertical="top"
        multiline={true}
        placeholder="Tell us about your experience"
        onChangeText={(text) => setfeedback(text)}
        value={feedback}
        underlineColorAndroid="transparent"
        blurOnSubmit={true}
        onSubmitEditing={()=>{Keyboard.dismiss()}}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (feedback.length == 0) {
            alert("Feedback is empty! Please enter your feedback");
          } else if (name.length == 0) {
            alert("Name is empty! Please enter your name");
          } else {
            giveFeedback();
          }
        }}
      >
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
  changePassText: {
    fontFamily: font,
    fontSize: 28,
    marginTop: "5%",
    textAlign: "center",
  },
  input: {
    fontFamily: font,
    height: 50,
    borderRadius: 5,
    color: "black",
    fontSize: 20,
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
    marginTop: "5%",
    marginBottom: 10,
    marginLeft: "5%",
    marginRight: "5%",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  inputLast: {
    height: 250,
    fontSize: 18,
    color: "black",
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
    marginTop: "5%",
    marginBottom: 10,
    marginLeft: "5%",
    marginRight: "5%",
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "5%",
  },
  button: {
    backgroundColor: "#006400",
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
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    fontFamily: font,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
