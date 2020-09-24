import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Switch,
  Alert
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
} from "react-native-paper";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import profileImage from "../../../../assets/profile.png";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";

const screenWidth = Math.round(Dimensions.get("window").width);

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      admin: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    let userInfo = await getData(USERINFO);
    this.setState({ fullname: userInfo.profile.fullname });
    this.setState({ email: userInfo.profile.email });
    this.setState({ admin: userInfo.profile.admin });
  }

  showAboutUs() {
    Alert.alert(
      "WordUP",
      "We are a team of Georgia Tech Students who are committed to making a difference in the lives of people through Technology. Our mission for this application is to be able to promote engagement and connectedness by enabling people to create and attend events within the community as well as allowing people to view local jobs and news.",
      [
        {
          text: "OK",
          onPress: () => "",
        },
      ],
      { cancelable: false }
    );
  }

  onLoginOutPress = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.admin) {
      return (
        <View style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Avatar.Image style={{backgroundColor:"#fff", borderColor: '#006400', borderTopLeftRadius: 3, borderStyle:'solid' }} source={profileImage} size={100} />
            </View>
            <View>
              <Title style={styles.title}>
                {this.state.fullname + "(Admin)"}
              </Title>
            </View>
            <View>
              <Caption style={styles.caption}>{this.state.email}</Caption>
            </View>
          </View>

          {/* divider */}
          <View style={styles.divider}></View>

          <ScrollView style={styles.container}>

          {/* Edit/View Profile Section */}
          <TouchableOpacity style={styles.infoBoxWrapper} onPress={() => this.props.navigation.navigate("Profile")}>
            <MaterialCommunityIconsIcon
              name="account"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>View Profile</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </TouchableOpacity>

          {/* Change Password Section */}
          <View style={styles.infoBoxWrapper}>
            <MaterialCommunityIconsIcon
              name="lock"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>Change Password</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.infoBoxWrapper}>
            <MaterialCommunityIconsIcon
              name="bell"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>Notifications</Title>
              <Switch
                style={styles.switch}
                value={this.state.notifications}
                onValueChange={(value) =>
                  this.setState({ notifications: value })
                }
              />
            </View>
          </View>

          {/* Get Feedback */}
          <View style={styles.infoBoxWrapper}>
            <MaterialCommunityIconsIcon
              name="transcribe"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>Give Feedback</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </View>

          {/* About Us */}
          <TouchableOpacity style={styles.infoBoxWrapper} onPress={() => this.showAboutUs()}>
            <MaterialCommunityIconsIcon
              name="information"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>About Us</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLoginOutPress()}
          >
            <Text style={styles.buttonTitle}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Avatar.Image source={profileImage} size={100} />
            </View>
            <View>
              <Title style={styles.title}>{this.state.fullname}</Title>
            </View>
            <View>
              <Caption style={styles.caption}>{this.state.email}</Caption>
            </View>
          </View>

          {/* divider */}
          <View style={styles.divider}></View>

          <ScrollView style={styles.container}>

          {/* Edit/View Profile Section */}
          <TouchableOpacity style={styles.infoBoxWrapper} onPress={() => this.props.navigation.navigate("Profile")}>
            <MaterialCommunityIconsIcon
              name="account"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>View Profile</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </TouchableOpacity>

          {/* Change Password Section */}
          <View style={styles.infoBoxWrapper}>
            <MaterialCommunityIconsIcon
              name="lock"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>Change Password</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.infoBoxWrapper}>
            <MaterialCommunityIconsIcon
              name="bell"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>Notifications</Title>
              <Switch
                style={styles.switch}
                value={this.state.notifications}
                onValueChange={(value) =>
                  this.setState({ notifications: value })
                }
              />
            </View>
          </View>

          {/* Get Feedback */}
          <View style={styles.infoBoxWrapper}>
            <MaterialCommunityIconsIcon
              name="transcribe"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>Give Feedback</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </View>

          {/* About Us */}
          <TouchableOpacity style={styles.infoBoxWrapper} onPress={() => this.showAboutUs()}>
            <MaterialCommunityIconsIcon
              name="information"
              style={styles.icons}
            ></MaterialCommunityIconsIcon>
            <View>
              <Title style={styles.menuTitleM}>About Us</Title>
              <IoniconsIcon
                name="ios-arrow-forward"
                style={styles.arrow}
              ></IoniconsIcon>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLoginOutPress()}
          >
            <Text style={styles.buttonTitle}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfoSection: {
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.8,
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    width: "90%",
    marginLeft: screenWidth / 20,
    // justifyContent: "center"
  },
  menuTitleM: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF0000",
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
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrow: {
    left: screenWidth - 85,
    position: "absolute",
    color: "#006400",
    fontSize: 32,
  },
  switch: {
    left: screenWidth - 120,
    position: "absolute",
    color: "#006400",
    fontSize: 32,
  },
  divider: {
    width: screenWidth,
    height: 1,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(155,155,155,1)",
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 3,
  },
  icons: {
    color: "#70AF1A",
    fontSize: 32,
  },
});

export default SettingsScreen;
