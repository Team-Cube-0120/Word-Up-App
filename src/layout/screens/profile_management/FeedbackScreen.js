import React, { Component, useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  View,
} from "react-native";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-rating-element";
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";

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
    setName(userInfo.fullname);
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
    fontSize: 28,
    marginTop: 30,
    ...Platform.select({
      ios: {
        marginLeft: 36,
      },
      android: {
        marginLeft: 42,
      },
      default: {
        marginLeft: 39,
      },
    }),
  },
  input: {
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
    fontSize: 18,
    color: "black",
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
    backgroundColor: "#006400",
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
