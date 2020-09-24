import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";
import {
  Avatar,
  Caption,
  Text,
  Portal,
  Dialog,
  Provider,
  Button,
  Paragraph,
} from "react-native-paper";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import profileImage from "../../../../assets/profile.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const screenWidth = Math.round(Dimensions.get("window").width);

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showPlaceholderGender: true,
      showPlaceholderBirthday: true,
      isEditProfile: false,
      dialogVisible: false,
      isUsername: true,
      tmpData: {},
      profile: {},
      setData: {},
    };
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleDone = () => {
    this.setState({ dialogVisible: false });
  };

  handleChangeDate = (date) => {
    var formatedDate = moment(date).format("MMMM Do, YYYY");
    this.handleCloseDate();
    let copyTmpData = { ...this.state.tmpData };
    copyTmpData["birthday"] = formatedDate;
    this.setState({ tmpData: copyTmpData });
    this.setState({ showPlaceholderBirthday: false });
  };

  handleCloseDate = () => {
    this.setState({ open: false });
  };

  handleOpenDate = () => {
    Keyboard.dismiss();
    this.setState({ open: true });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    let userInfo = await getData(USERINFO);
    // console.log(this.state.tmpData)
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
    let copyData = { ...this.state.profile };
    this.setState({ tmpData: copyData });
    // console.log(this.state.tmpData)
  }

  showSubmissionAlert() {
    if (this.state.isUsername == false) {
      Alert.alert("Error!", "Please type a username with no spaces", [
        {
          text: "OK",
          onPress: () => this.setState({ isEditProfile: true }),
        },
        { cancelable: false },
      ]);
    } else {
      Alert.alert(
        "Confirm Submission",
        "Are you sure you want to make these changes to your profile?",
        [
          {
            text: "Confirm",
            onPress: () => this.compareData(),
          },
          {
            text: "Cancel",
            onPress: () => this.setState({ isEditProfile: true }),
          },
        ],
        { cancelable: false }
      );
    }
  }

  compareData() {
    this.setState({ isEditProfile: false });
    console.log(this.state.tmpData);
    console.log(this.state.profile);
    var objNotSame = JSON.stringify(this.state.profile) === JSON.stringify(this.state.tmpData);
    console.log(objNotSame);
    // if (objNotSame){
    //   this.setState({profile: tmpData})
    // }
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
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  render() {
    if (this.state.isEditProfile === false) {
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
              <View style={{ top: 15, right: screenWidth / 6.2 }}>
                <Text style={{ fontSize: 18 }}>
                  {this.state.profile.location}
                </Text>
              </View>
            </View>

            <View style={styles.infoBoxWrapperDate}>
              <View>
                <Caption style={styles.captionDob}>Birthday</Caption>
              </View>
              <View style={{ top: 15, right: screenWidth / 6.31 }}>
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
                <Text style={{ fontSize: 18 }}>
                  {this.state.profile.gender}
                </Text>
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

          {/* <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={() => this.setState({ isEditProfile: false })}
          >
            <Text style={styles.buttonTitleSubmit}>Submit</Text>
          </TouchableOpacity> */}
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
              <View
                style={{ top: 15, flex: 1, alignItems: "stretch", right: 40 }}
              >
                <TextInput
                  style={{ fontSize: 20 }}
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
              <View
                style={{
                  top: 15,
                  flex: 1,
                  alignItems: "stretch",
                  right: screenWidth / 5.3,
                }}
              >
                <TextInput
                  style={{ fontSize: 20 }}
                  placeholder={this.state.profile.username}
                  returnKeyType={"done"}
                  onChangeText={(username) => {
                    if (/^\S*[A-Za-z0-9]*\S*$/.test(username)) {
                      let copyTmpData = { ...this.state.tmpData };
                      copyTmpData["username"] = username;
                      this.setState({ tmpData: copyTmpData });
                    } else {
                      alert("Username can not contain any spaces.");
                      this.setState({ isUsername: false });
                    }
                  }}
                />
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View>
                <Caption style={styles.caption}>Location</Caption>
              </View>
              <View
                style={{
                  top: 15,
                  flex: 1,
                  alignItems: "stretch",
                  right: screenWidth / 6.2,
                }}
              >
                <TextInput
                  style={{ fontSize: 20 }}
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

            <TouchableOpacity
              onPress={this.handleOpenDate}
              style={styles.infoBoxWrapper}
            >
              <View>
                <Caption style={styles.caption}>Birthday</Caption>
              </View>
              <View style={{ top: 15, right: screenWidth / 6.31 }}>
                <DateTimePicker
                  style={{ backgroundColor: "#fff" }}
                  date={new Date()}
                  isVisible={this.state.open}
                  mode={"date"}
                  minimumDate={new Date(1900, 1, 1)}
                  display="default"
                  onConfirm={this.handleChangeDate}
                  onCancel={this.handleCloseDate}
                ></DateTimePicker>

                {this.state.showPlaceholderBirthday && (
                  <Text
                    onPress={this.handleOpenDate}
                    style={{ fontSize: 20, color: "#C0C0C0" }}
                  >
                    {this.state.profile.birthday}
                  </Text>
                )}

                {this.state.showPlaceholderBirthday == false && (
                  <Text onPress={this.handleOpenDate} style={{ fontSize: 20 }}>
                    {this.state.tmpData.birthday}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.infoBoxWrapper}>
              <View>
                <Caption style={styles.caption}>Gender</Caption>
              </View>
              <View style={{ top: 15, right: screenWidth / 7.4 }}>
                <ModalSelector
                  data={[
                    { key: 0, label: "Male" },
                    { key: 1, label: "Female" },
                    { key: 2, label: "Other" },
                  ]}
                  initValue={this.state.profile.gender}
                  supportedOrientations={["portrait"]}
                  accessible={true}
                  scrollViewAccessibilityLabel={"Scrollable options"}
                  cancelButtonAccessibilityLabel={"Cancel Button"}
                  onChange={(option) => {
                    let copyTmpData = { ...this.state.tmpData };
                    copyTmpData["gender"] = option.label;
                    this.setState({ tmpData: copyTmpData });
                    this.setState({ showPlaceholderGender: false });
                  }}
                >
                  {this.state.showPlaceholderGender && (
                    <TextInput
                      style={{ fontSize: 20 }}
                      editable={false}
                      placeholder={this.state.profile.gender}
                    />
                  )}
                  {this.state.showPlaceholderGender == false && (
                    <TextInput
                      style={{ fontSize: 20 }}
                      editable={false}
                      placeholder={this.state.profile.gender}
                      value={this.state.tmpData.gender}
                    />
                  )}
                </ModalSelector>
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View>
                <Caption style={styles.caption}>Phone Number</Caption>
              </View>
              <View
                style={{
                  top: 15,
                  flex: 1,
                  alignItems: "stretch",
                  right: screenWidth / 3.65,
                }}
              >
                <TextInput
                  style={{ fontSize: 20 }}
                  placeholder={this.state.profile.phoneNum}
                  underlineColorAndroid="transparent"
                  keyboardType={"numeric"}
                  returnKeyType={"done"}
                  maxLength={10}
                  onChangeText={(phoneNum) => {
                    let copyTmpData = { ...this.state.tmpData };
                    copyTmpData["phoneNum"] = this.formatPhoneNumber(phoneNum);
                    this.setState({ tmpData: copyTmpData });
                  }}
                />
              </View>
            </View>

            <Provider>
              <TouchableOpacity
                style={styles.infoBoxWrapperParagraph}
                onPress={this.showDialog}
              >
                <View>
                  <Caption style={styles.captionParagraph}>Bio</Caption>
                </View>
                <View style={{ marginRight: 10 }}>
                  <Paragraph style={{ marginRight: 10 }}>
                    {this.state.tmpData.bio}
                  </Paragraph>
                  <Portal>
                    <Dialog
                      style={{ backgroundColor: "#fff" }}
                      visible={this.state.dialogVisible}
                      onDismiss={this.handleDone}
                    >
                      <Dialog.Title style={{ alignItems: "center" }}>
                        Bio
                      </Dialog.Title>
                      <Dialog.Content>
                        <TextInput
                          style={{ fontSize: 20 }}
                          placeholder={this.state.profile.bio}
                          underlineColorAndroid="transparent"
                          multiline={true}
                          onChangeText={(bio) => {
                            let copyTmpData = { ...this.state.tmpData };
                            copyTmpData["bio"] = bio;
                            this.setState({ tmpData: copyTmpData });
                          }}
                        ></TextInput>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={this.handleDone}>
                          <Text style={{ color: "#006400" }}>Done</Text>
                        </Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </View>
              </TouchableOpacity>
            </Provider>
          </KeyboardAwareScrollView>

          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={() => this.setState(() => this.showSubmissionAlert())}
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
  onePicker: {
    width: 200,
    height: 44,
    backgroundColor: "#FFF0E0",
    borderColor: "black",
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: "red",
  },
  input: {
    minHeight: 40,
    maxHeight: 130,
    fontSize: 18,
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
