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
  TouchableRipple,
} from "react-native-paper";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import profileImage from "../../../../assets/profile.png";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const screenWidth = Math.round(Dimensions.get('window').width)


class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  showAboutUs() {
    Alert.alert(
      'WordUP',
      'We are a team of Georgia Tech Students who are committed to making a difference in the lives of people through Technology. Our mission for this application is to be able to promote engagement and connectedness by enabling people to create and attend events within the community as well as allowing people to view local jobs and news.',
      [  
        {
          text: 'OK', 
          onPress: () => ""
        },   
      ],   
      { cancelable: false }, 
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
    return (
      <ScrollView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Avatar.Image source={profileImage} size={100} />
          </View>
          <View>
            <Title style={styles.title}>""</Title>
          </View>
          <View>
            <Caption style={styles.caption}>email</Caption>
          </View>
        </View>

        {/* divider */}
        <View
          style={styles.divider}
        ></View>
        
        {/* Edit Profile Section */}
        <View style={styles.infoBoxWrapper}>
         <MaterialCommunityIconsIcon
          name="account"
          style={styles.icons}
        ></MaterialCommunityIconsIcon>
          <View>
            <Title style={styles.menuTitleM}>Edit Profile</Title>
            <IoniconsIcon name="ios-arrow-forward"
            style={styles.arrow}
            onPress={() => {
              this.props.navigation.navigate("Edit Profile");
            }}
          ></IoniconsIcon>
          </View>
        </View>

         {/* Change Password Section */}
        <View style={styles.infoBoxWrapper}>
        <MaterialCommunityIconsIcon
          name="lock"
          style={styles.icons}
        ></MaterialCommunityIconsIcon>
          <View>
            <Title style={styles.menuTitleM}>Change Password</Title>
            <IoniconsIcon name="ios-arrow-forward"
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
            <Switch style={styles.switch}
                value={this.state.notifications}
                onValueChange={value => this.setState({ notifications: value })}
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
            <IoniconsIcon name="ios-arrow-forward"
            style={styles.arrow}
          ></IoniconsIcon>
          </View>
        </View>

        {/* About Us */}
        <View style={styles.infoBoxWrapper}>
        <MaterialCommunityIconsIcon
          name="information"
          style={styles.icons}
        ></MaterialCommunityIconsIcon>
          <View>
            <Title style={styles.menuTitleM}>About Us</Title>
            <IoniconsIcon name="ios-arrow-forward"
            style={styles.arrow}
            onPress={() => this.showAboutUs()}
            ></IoniconsIcon>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onLoginOutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
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
    width:"90%",
    marginLeft:screenWidth/20
    // justifyContent: "center"
  },
  menuTitleM: {
    flexDirection:"row",
    alignItems:"center",
    position:"relative",
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
    color: "rgba(69,96,238,1)",
    fontSize: 32
  },
  switch: {
    left: screenWidth - 120,
    position: "absolute",
    color: "rgba(69,96,238,1)",
    fontSize: 32
  },
  divider:{
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
    color: "rgba(74,144,226,1)",
    fontSize: 32
  }
});

export default SettingsScreen;
