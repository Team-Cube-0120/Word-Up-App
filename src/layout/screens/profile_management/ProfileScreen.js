import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { Avatar, Title, Caption, Text } from "react-native-paper";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import profileImage from "../../../../assets/profile.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";

const screenWidth = Math.round(Dimensions.get("window").width);

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfile: false,
      tmpData: {},
      profile: {},
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    let userInfo = await getData(USERINFO);
    this.setState({
      tmpData: {
        profileImageUrl: "",
        fullname: userInfo.profile.fullname,
        email: userInfo.profile.email,
        birthday: "",
        phoneNum: "",
        username: "",
        bio: "",
        location: "",
        gender: "",
        admin: userInfo.profile.admin,
      },
    });
    this.setState({
      profile: {
        profileImageUrl: userInfo.profile.profileImageUrl,
        fullname: userInfo.profile.fullname,
        email: userInfo.profile.email,
        birthday: userInfo.profile.birthday,
        phoneNum: userInfo.profile.phoneNum,
        username: userInfo.profile.username,
        bio: userInfo.profile.bio,
        location: userInfo.profile.location,
        gender: userInfo.profile.gender,
        admin: userInfo.profile.admin,
      },
    });
  }

  compareData() {
    this.setState({isEditProfile: false})
    // console.log(this.state.tmpData)
    // console.log(this.state.profile)
  }

  handleEditProfileRequest() {
      Alert.alert(
        "Editing Profile",
        "Select the fields you want to change and make the appropriate changes. You can scroll down to see all the available fields. Once you have changed all the desired fields, click Submit at the bottom to accept changes.",
        [
          {
            text: "OK",
            onPress: () => this.setState({ isEditProfile: true }),
          },
        ],
        { cancelable: false }
      );
  }

  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  render() {
    if (this.state.isEditProfile === false){
        return (
            <View style={styles.container}>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Avatar.Image
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#006400",
                      borderTopLeftRadius: 3,
                      borderStyle: "solid",
                    }}
                    source={profileImage}
                    size={100}
                  ></Avatar.Image>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleEditProfileRequest()}
              >
                <Text style={styles.buttonTitle}>Edit Profile</Text>
              </TouchableOpacity>
      {/* 
              <View style={styles.CircleShapeView}>
                <MaterialCommunityIconsIcon
                  name="account-edit"
                  style={styles.editIcon}
                ></MaterialCommunityIconsIcon>
              </View> */}
      
              {/* divider */}
              <View style={styles.divider}></View>
      
              <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Name</Caption>
                  </View>
                  <View style={{ top: 15, right: 40 }}>
                    <Text style={{ fontSize: 18 }}>
                      {this.state.profile.fullname}
                    </Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Username</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 5.3 }}>
                    <Text style={{ fontSize: 18 }}>
                      {this.state.profile.username}
                    </Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Location</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 6.3 }}>
                    <Text style={{ fontSize: 18 }}>
                      {this.state.profile.location}
                    </Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapperDate}>
                  <View>
                    <Caption style={styles.captionDob}>Date of Birth</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 4.2 }}>
                    <Text style={{ fontSize: 18 }}>
                      {this.state.profile.birthday}
                    </Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Gender</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 7.4 }}>
                    <Text style={{ fontSize: 18 }}>{this.state.profile.gender}</Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Phone Number</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 3.65 }}>
                    <Text style={{ fontSize: 18 }}>
                      {this.state.profile.phoneNum}
                    </Text>
                  </View>
                </View>
      
      
      
                <View style={styles.infoBoxWrapperParagraph}>
                  <View>
                    <Caption style={styles.captionParagraph}>Bio</Caption>
                  </View>
                  <View style={{ top: 10, marginRight: 10 }}>
                    <TextInput
                      style={styles.input}
                      value={this.state.profile.bio}
                      multiline={true}
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
      
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => this.setState({ isEditProfile: false })}
              >
                <Text style={styles.buttonTitleSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          );
    } else if (this.state.isEditProfile) {
        return (
            <View style={styles.container}>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Avatar.Image
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#006400",
                      borderTopLeftRadius: 3,
                      borderStyle: "solid",
                    }}
                    source={profileImage}
                    size={100}
                  ></Avatar.Image>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleEditProfileRequest()}
              >
                <Text style={styles.buttonTitle}>Edit Profile</Text>
              </TouchableOpacity>
      
              <View style={styles.CircleShapeView}>
                <MaterialCommunityIconsIcon
                  name="account-edit"
                  style={styles.editIcon}
                ></MaterialCommunityIconsIcon>
              </View>
      
              {/* divider */}
              <View style={styles.divider}></View>
      
              <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Name</Caption>
                  </View>
                  <View style={{ top: 15, flex: 1,
                        alignItems: 'stretch', right: 40 }}>
                    <TextInput
                      style={{fontSize:20}}
                      placeholder={this.state.profile.fullname}
                      returnKeyType={"done"}
                      onChangeText={(fullname) => {
                        let copyTmpData = { ...this.state.tmpData };
                        copyTmpData["fullname"] = fullname;
                        this.setState({ tmpData: copyTmpData });
                      }}
                    />
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Username</Caption>
                  </View>
                  <View style={{ top: 15, flex: 1,
                        alignItems: 'stretch', right: screenWidth / 5.3 }}>
                    <TextInput
                      style={{fontSize:20}}
                      placeholder={this.state.profile.username}
                      returnKeyType={"done"}
                      onChangeText={(username) => {
                        if (/^\S*[A-Za-z0-9]*\S*$/.test(username)) {
                          let copyTmpData = { ...this.state.tmpData };
                          copyTmpData["username"] = username;
                          this.setState({ tmpData: copyTmpData });
                        } else {
                          alert(
                            "Username can only contain letters and numbers and no spaces are allowed."
                          );
                        }
                      }}
                    />
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Location</Caption>
                  </View>
                  <View style={{ top: 15, flex: 1,
                        alignItems: 'stretch', right: screenWidth / 6.3 }}>
                    <TextInput
                      style={{fontSize:20}}
                      placeholder={this.state.profile.location}
                      returnKeyType={"done"}
                      onChangeText={(location) => {
                        let copyTmpData = { ...this.state.tmpData };
                        copyTmpData["location"] = location;
                        this.setState({ tmpData: copyTmpData });
                      }}
                    />
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapperDate}>
                  <View>
                    <Caption style={styles.captionDob}>Date of Birth</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 4.2 }}>
                    <Text style={{ fontSize: 18 }}>
                      {this.state.profile.birthday}
                    </Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Gender</Caption>
                  </View>
                  <View style={{ top: 15, right: screenWidth / 7.4 }}>
                    <Text style={{ fontSize: 18 }}>{this.state.profile.gender}</Text>
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapper}>
                  <View>
                    <Caption style={styles.caption}>Phone Number</Caption>
                  </View>
                  <View style={{ top: 15, flex: 1,
                        alignItems: 'stretch', right: screenWidth / 3.65 }}>
                  <TextInput
                      style={{fontSize:20}}
                      placeholder={this.state.profile.phoneNum}
                      underlineColorAndroid="transparent"
                      keyboardType={"numeric"}
                      returnKeyType={"done"}
                      onChangeText={(phoneNum) => {
                          if ((phoneNum.length == 10)){
                              let copyTmpData = { ...this.state.tmpData };
                              copyTmpData["phoneNum"] = this.formatPhoneNumber(phoneNum);
                              this.setState({ tmpData: copyTmpData });
                          }  
                          else if ((phoneNum.length > 10)){
                              alert("The phone number you entered has too many digits. It should only have 10 digits. Please re-type it.")
                          }
                          else if((phoneNum.includes('.'))){
                              alert("Period detected! Please re-type your phone number.")
                          }
                          
                        }}
                    />
                  </View>
                </View>
      
                <View style={styles.infoBoxWrapperParagraph}>
                  <View>
                    <Caption style={styles.captionParagraph}>Bio</Caption>
                  </View>
                  <View style={{ top: 10, marginRight: 10 }}>
                    <TextInput
                      style={styles.input}
                      placeholder={this.state.profile.bio}
                      multiline={true}
                      onChangeText={bio =>{
                          let copyTmpData = { ...this.state.tmpData };
                          copyTmpData["bio"] = bio;
                          this.setState({ tmpData: copyTmpData });
                      }}
                      value={this.state.tmpData.bio}
                      underlineColorAndroid="transparent"
                      returnKeyType={"done"}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
      
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => this.setState(() => this.compareData())}
              >
                <Text style={styles.buttonTitleSubmit}>Submit</Text>
              </TouchableOpacity>
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
  input: {
    minHeight: 40,
    maxHeight: 130,
    fontSize:18
  },
  CircleShapeView: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    backgroundColor: "#fff",
    left: screenWidth / 1.75,
    bottom: 155,
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
    bottom: 10,
  },
  captionDob: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    bottom: 20,
  },
  captionParagraph: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    bottom: 60,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapperDate: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.8,
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    width: "90%",
    marginLeft: screenWidth / 20,
    // justifyContent: "center"
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.8,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    width: "90%",
    marginLeft: screenWidth / 20,
    // justifyContent: "center"
  },
  infoBoxWrapperParagraph: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.8,
    flexDirection: "row",
    height: 155,
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
    backgroundColor: "#fff",
    borderColor: "#000",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
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
    marginLeft: screenWidth / 3.3,
    marginRight: 30,
    marginBottom: 10,
    height: 40,
    width: "40%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSubmit: {
    backgroundColor: "#006400",
    borderColor: "#000",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
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
    marginLeft: screenWidth / 3.3,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    height: 35,
    width: "40%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitleSubmit: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTitle: {
    color: "#006400",
    fontSize: 16,
    fontWeight: "bold",
  },
  textChange: {
    left: screenWidth - 310,
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
    shadowRadius: 1,
  },
  icons: {
    color: "#70AF1A",
    fontSize: 32,
  },
  editIcon: {
    color: "#006400",
    fontSize: 30,
  },
});

export default SettingsScreen;
