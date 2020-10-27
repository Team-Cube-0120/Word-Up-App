import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Switch,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Title, Caption, Text } from "react-native-paper";
import profileImage from "../../../../assets/profile.png";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";

const screenWidth = Math.round(Dimensions.get("window").width);

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fullname: "",
      email: "",
      admin: false,
      profileImageUrl: "",
      notifications: "",
    };
  }

  componentDidMount() {
    this.getUserInfo().catch((e) => console.log(e));
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getUserInfo();
      }
    );
  }

  async getUserInfo() {
    let userInfo = await getData(USERINFO);
    this.setState({ fullname: userInfo.profile.fullname });
    this.setState({ email: userInfo.profile.email });
    this.setState({ admin: userInfo.profile.admin });
    this.setState({ profileImageUrl: userInfo.profile.profileImageUrl });
    this.setState({ isLoading: false });
    // console.log(user)
    // console.log(this.state)
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
    // console.log(this.state.isLoading);
    if (this.state.isLoading) {
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
      if (this.state.admin) {
        return (
          <View style={styles.container}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
              {this.state.profileImageUrl == "" && (
                      <Image
                        source={profileImage}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100 / 2,
                        }}
                      />
                  )}

                  {this.state.profileImageUrl != "" && (
                      <Image
                        source={{
                          uri:
                            this.state.profileImageUrl,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100 / 2,
                        }}
                      />
                  )}
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
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <MaterialCommunityIconsIcon
                  name="account"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>View Profile</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
                </View>
              </TouchableOpacity>

              {/* Change Password Section */}
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.props.navigation.navigate("Change Password")}
              >
                <MaterialCommunityIconsIcon
                  name="lock"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>Change Password</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
                </View>
              </TouchableOpacity>

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
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.props.navigation.navigate("Feedback")}
              >
                <MaterialCommunityIconsIcon
                  name="transcribe"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>Give Feedback</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
                </View>
              </TouchableOpacity>

              {/* About Us */}
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.showAboutUs()}
              >
                <MaterialCommunityIconsIcon
                  name="information"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>About Us</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
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
              {this.state.profileImageUrl == "" && (
                      <Image
                        source={profileImage}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100 / 2,
                        }}
                      />
                  )}

                  {this.state.profileImageUrl != "" && (
                      <Image
                        source={{
                          uri:
                           this.state.profileImageUrl,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100 / 2,
                        }}
                      />
                  )}
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
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <MaterialCommunityIconsIcon
                  name="account"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>View Profile</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
                </View>
              </TouchableOpacity>

              {/* Change Password Section */}
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.props.navigation.navigate("Change Password")}
              >
                <MaterialCommunityIconsIcon
                  name="lock"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>Change Password</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
                </View>
              </TouchableOpacity>

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
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.props.navigation.navigate("Feedback")}
              >
                <MaterialCommunityIconsIcon
                  name="transcribe"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>Give Feedback</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
                </View>
              </TouchableOpacity>

              {/* About Us */}
              <TouchableOpacity
                style={styles.infoBoxWrapper}
                onPress={() => this.showAboutUs()}
              >
                <MaterialCommunityIconsIcon
                  name="information"
                  style={styles.icons}
                ></MaterialCommunityIconsIcon>
                <View>
                  <Title style={styles.menuTitleM}>About Us</Title>
                  <MaterialCommunityIconsIcon
                    name="arrow-right"
                    style={styles.arrow}
                  ></MaterialCommunityIconsIcon>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfoSection: {
    alignItems: "center",
    marginBottom: 10,
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
    ...Platform.select({
      ios: {
        left: 275,
      },
      android: {
        left: 310,
      },
      default: {
        left: 290,
      },
    }),
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
