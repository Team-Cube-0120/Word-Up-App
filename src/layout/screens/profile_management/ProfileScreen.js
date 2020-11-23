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
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import {
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
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "react-native-modal-datetime-picker";
import SubmissionDialog from "../../../components/dialog/SubmissionDialog";
import moment from "moment";
import ApiService from "../../../service/api/ApiService";
import * as ImagePicker from "expo-image-picker";
import { updateUserInfo } from '../../../util/LocalStorage';

const screenWidth = Math.round(Dimensions.get("window").width);

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: false,
      isEditProfile: false,
      isPlaceholderBio: true,
      isGenderChanged: false,
      isDateChanged: false,
      dialogVisible: false,
      isUsername: true,
      isLoading: false,
      isImgLoaded: false,
      uploadedImage: false,
      toggleDialog: false,
      selectedImage: false,
      title: "",
      userProfileResponse: " ",
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
    this.handleCloseDate();
    this.setState({ isDateChanged: true });
    var formatedDate = moment(date).format("MMMM Do, YYYY");
    let copyTmpData = { ...this.state.tmpData };
    copyTmpData["birthday"] = formatedDate;
    this.setState({ tmpData: copyTmpData });
  };

  handleCloseDate = () => {
    this.setState({ open: false });
  };

  handleOpenDate = () => {
    Keyboard.dismiss();
    this.setState({ open: true });
  };

  componentDidMount() {
    this.getUserInfo().catch((e) => console.log(e));
    this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      () => {
        this.getUserInfo().catch((e) => console.log(e));
      }
    );
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })().catch((e) => console.log(e));
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).catch((e) => alert("Error selecting image: " + e));

    // console.log(result);

    if (!result.cancelled) {
      // console.log(this.state.profile)
      this.setState({ selectedImage: true });
      this.setState({ uploadedImage: false });

      this.uploadImage(result.uri, "profileImage-" + this.state.profile.id)
        .then((response) => {
          alert("Images has been successfully selected!");
          let copyTmpData = { ...this.state.tmpData };
          copyTmpData["profileImageUrl"] = response;
          this.setState({ tmpData: copyTmpData });
          this.setState({ uploadedImage: true });
          this.setState({ selectedImage: false });
          this.setState({
            profile: {
              profileImageUrl: response,
              fullname: this.state.profile.fullname,
              email: this.state.profile.email,
              birthday: this.state.profile.birthday,
              phoneNum: this.state.profile.phoneNum,
              username: this.state.profile.username,
              bio: this.state.profile.bio,
              location: this.state.profile.location,
              gender: this.state.profile.gender,
              id: this.state.profile.id,
            },
          });
        })
        .catch((e) => {
          alert("Error: File not uploaded ");
          this.setState({ uploadedImage: false });
          this.setState({ selectedImage: false });
        });
    } else if (result.cancelled) {
      this.setState({ uploadedImage: false });
      this.setState({ selectedImage: false });
      alert("Image could was not selected");
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL();

    blob.close();
    return remoteUri;
  };

  async getUserInfo() {
    let userInfo = await getData(USERINFO);

    // console.log(userInfo.profile)
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
        id: userInfo.profile.id,
      },
    });
    // console.log(this.state.profile)
    let copyData = { ...this.state.profile };
    this.setState({ tmpData: copyData });
    this.setState({ isLoading: false });
    this.setState({ isImgLoaded: true });
  }

  showSubmissionAlert() {
    this.setState({ isDateChanged: false });
    this.setState({ isGenderChanged: false });
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
    const data = Object.assign(this.state.profile, this.state.tmpData);
    this.setState({ profile: data });
    this.uploadData().catch((e) => console.log(e));
  }

  async uploadData() {
    this.setState({ isLoading: true });
    let storeDataA = await getData(USERINFO);
    storeDataA.fullname = this.state.profile.fullname;
    storeDataA.profile = this.state.profile;
    const userID = firebase.auth().currentUser.uid;
    // console.log(userID)
    var db = firebase.firestore();
    db.collection("users")
      .doc(userID)
      .update({ profile: this.state.profile })
      .update({fullname: this.state.profile.fullname})
      .then((response) =>
        this.setState({
          title: "Congratulations!",
          userProfileResponse:
            "Profile information has been successfully updated!",
        })
      )
      .then(async () => updateUserInfo(storeData.id))
      .catch((error) =>
        this.setState({
          title: "Error!",
          userProfileResponse:
            "There was a problem updating your profile information. Please try again.",
        })
      )
      .then(() => this.openDialog());
  }

  openDialog() {
    this.setState({ isLoading: false });
    this.setState({ toggleDialog: true });
  }

  closeDialog() {
    this.setState({ toggleDialog: false });
  }

  handleEditProfileRequest() {
    Alert.alert(
      "Editing Profile",
      "Select the fields you want to change and make the appropriate changes. You can scroll down to see all the available fields. If you want to change the profile image click on the image itself. Once you have changed all the desired fields, click Submit at the bottom to accept changes.",
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
    if (!this.state.isImgLoaded) {
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
          <ActivityIndicator size="large" color="#006400" />
        </View>
      );
    } else {
      if (this.state.isEditProfile === false) {
        return (
          <View style={styles.container}>
            <SubmissionDialog
              visible={
                this.state.toggleDialog && this.state.isEditProfile == false
              }
              onClose={() => this.closeDialog()}
              text={this.state.userProfileResponse}
              title={this.state.title}
            />
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {this.state.profile.profileImageUrl == "" &&
                  this.state.isImgLoaded && (
                    <Image
                      source={profileImage}
                      style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                    />
                  )}

                {this.state.isImgLoaded &&
                  this.state.profile.profileImageUrl !== "" && (
                    <Image
                      resizeMethod="auto"
                      source={{
                        uri: this.state.profile.profileImageUrl,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100 / 2,
                      }}
                    />
                  )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleEditProfileRequest()}
            >
              <Text style={styles.buttonTitle}>Edit Profile</Text>
            </TouchableOpacity>

            {/* divider */}
            <ScrollView style={styles.container}>
              <View style={styles.divider}></View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Name</Caption>
                </View>
                <View style={styles.boxName}>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.profile.fullname}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Username</Caption>
                </View>
                <View style={styles.boxUsername}>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.profile.username}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Location</Caption>
                </View>
                <View style={styles.boxLocation}>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.profile.location}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapperDate}>
                <View>
                  <Caption style={styles.captionDob}>Birthday</Caption>
                </View>
                <View style={styles.boxBirthday}>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.profile.birthday}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Gender</Caption>
                </View>
                <View style={styles.boxGender}>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.profile.gender}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Phone Number</Caption>
                </View>
                <View style={styles.boxPhone}>
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
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        );
      } else if (this.state.isEditProfile) {
        return (
          <KeyboardAwareScrollView
            extraScrollHeight={25}
            style={styles.container}
          >
            <View>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: "row", marginTop: 18 }}>
                  {this.state.selectedImage && !this.state.uploadedImage && (
                    <ActivityIndicator size="large" color="#006400" />
                  )}

                  {this.state.tmpData.profileImageUrl == "" &&
                    ((!this.state.selectedImage && !this.state.uploadedImage) ||
                      (!this.state.selectedImage &&
                        this.state.uploadedImage)) && (
                      <TouchableOpacity onPress={this.pickImage}>
                        <Image
                          source={profileImage}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100 / 2,
                          }}
                        />
                      </TouchableOpacity>
                    )}

                  {this.state.tmpData.profileImageUrl != "" &&
                    ((!this.state.selectedImage && !this.state.uploadedImage) ||
                      (!this.state.selectedImage &&
                        this.state.uploadedImage)) && (
                      <TouchableOpacity onPress={this.pickImage}>
                        <Image
                          resizeMethod="auto"
                          source={{
                            uri: this.state.tmpData.profileImageUrl,
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100 / 2,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                </View>
                <View style={styles.CircleShapeView}>
                  <MaterialCommunityIconsIcon
                    name="account-edit"
                    style={styles.editIcon}
                  ></MaterialCommunityIconsIcon>
                </View>
                <Text style={{ bottom: 10, fontSize: 15, color: "#C0C0C0" }}>
                  Click to Change Profile Picture
                </Text>
              </View>

              {/* divider */}
              <View style={styles.divider}></View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Name</Caption>
                </View>
                <View style={styles.boxName}>
                  <TextInput
                    style={{ fontSize: 20, color: "black" }}
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
                <View style={styles.boxUsername}>
                  <TextInput
                    style={{ fontSize: 20, color: "black" }}
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
                <View style={styles.boxLocation}>
                  <TextInput
                    style={{ fontSize: 20, color: "black" }}
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

              <TouchableOpacity style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Birthday</Caption>
                </View>
                <View style={styles.boxBirthday}>
                  <DateTimePicker
                    style={{ backgroundColor: "#fff" }}
                    date={new Date()}
                    isVisible={this.state.open}
                    mode={"date"}
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date(2009, 1, 1)}
                    display="default"
                    onConfirm={this.handleChangeDate}
                    onCancel={this.handleCloseDate}
                  ></DateTimePicker>

                  {this.state.isDateChanged && (
                    <Text
                      onPress={this.handleOpenDate}
                      style={{ fontSize: 20, color: "black" }}
                    >
                      {this.state.tmpData.birthday}
                    </Text>
                  )}

                  {this.state.isDateChanged === false && (
                    <Text
                      onPress={this.handleOpenDate}
                      style={{ fontSize: 20, color: "#a6a6a6" }}
                    >
                      {this.state.profile.birthday}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Gender</Caption>
                </View>
                <View style={styles.boxGender}>
                  <ModalSelector
                    data={[
                      { key: 0, label: "Male" },
                      { key: 1, label: "Female" },
                      { key: 2, label: "Other" },
                    ]}
                    initValue={this.state.profile.gender}
                    supportedOrientations={["portrait"]}
                    accessible={true}
                    animationType="fade"
                    cancelText="Cancel"
                    supportedOrientations={["portrait"]}
                    optionContainerStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#006400",
                      flexDirection: "row",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                    }}
                    optionTextStyle={{
                      color: "#70AF1A",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                    cancelTextStyle={{ color: "red", fontWeight: "bold" }}
                    cancelContainerStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#006400",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                    }}
                    overlayStyle={{
                      flex: 1,
                      padding: "5%",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                    scrollViewAccessibilityLabel={"Scrollable options"}
                    cancelButtonAccessibilityLabel={"Cancel Button"}
                    onChange={(option) => {
                      this.setState({ isGenderChanged: true });
                      let copyTmpData = { ...this.state.tmpData };
                      copyTmpData["gender"] = option.label;
                      this.setState({ tmpData: copyTmpData });
                    }}
                  >
                    {this.state.isGenderChanged && (
                      <TextInput
                        style={{ fontSize: 20, color: "black" }}
                        editable={false}
                        value={this.state.tmpData.gender}
                      />
                    )}
                    {this.state.isGenderChanged == false && (
                      <TextInput
                        style={{ fontSize: 20 }}
                        editable={false}
                        placeholder={this.state.profile.gender}
                      />
                    )}
                  </ModalSelector>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View>
                  <Caption style={styles.caption}>Phone Number</Caption>
                </View>
                <View style={styles.boxPhone}>
                  <TextInput
                    style={{ fontSize: 20, color: "black" }}
                    placeholder={this.state.profile.phoneNum}
                    keyboardType={"numeric"}
                    returnKeyType={"done"}
                    maxLength={10}
                    onChangeText={(phoneNum) => {
                      if (/^[0-9]*$/.test(phoneNum)) {
                        let copyTmpData = { ...this.state.tmpData };
                        copyTmpData["phoneNum"] = this.formatPhoneNumber(
                          phoneNum
                        );
                        this.setState({ tmpData: copyTmpData });
                      }
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
                    <Paragraph style={{ marginRight: 10, fontSize: 18 }}>
                      {this.state.tmpData.bio}
                    </Paragraph>
                    <Portal>
                      <Dialog
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#006400",
                          borderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                        }}
                        visible={this.state.dialogVisible}
                        onDismiss={this.handleDone}
                      >
                        <Dialog.Title
                          style={{ alignItems: "center", color: "#006400" }}
                        >
                          Bio
                        </Dialog.Title>
                        <Dialog.Content>
                          {true && (
                            <TextInput
                              style={{ fontSize: 20, color: "black" }}
                              defaultValue={this.state.tmpData.bio}
                              multiline={true}
                              onChangeText={(bio) => {
                                let copyTmpData = { ...this.state.tmpData };
                                copyTmpData["bio"] = bio;
                                this.setState({ tmpData: copyTmpData });
                                this.setState({ isPlaceholderBio: false });
                              }}
                            ></TextInput>
                          )}
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

              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => this.setState(() => this.showSubmissionAlert())}
              >
                <Text style={styles.buttonTitleSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  boxName: {
    ...Platform.select({
      ios: {
        top: 15,
        right: 42,
        flex: 1,
        alignItems: "stretch",
      },
      android: {
        top: 15,
        right: 40,
        flex: 1,
        alignItems: "stretch",
      },
      default: {
        top: 15,
        right: 40,
        flex: 1,
        alignItems: "stretch",
      },
    }),
  },
  boxUsername: {
    ...Platform.select({
      ios: {
        top: 15,
        right: 72,
        flex: 1,
        alignItems: "stretch",
      },
      android: {
        top: 15,
        right: 68,
        flex: 1,
        alignItems: "stretch",
      },
      default: {
        top: 15,
        right: 70,
        flex: 1,
        alignItems: "stretch",
      },
    }),
  },
  boxLocation: {
    ...Platform.select({
      ios: {
        top: 15,
        right: 61,
        flex: 1,
        alignItems: "stretch",
      },
      android: {
        top: 15,
        right: 58,
        flex: 1,
        alignItems: "stretch",
      },
      default: {
        top: 15,
        right: 60,
        flex: 1,
        alignItems: "stretch",
      },
    }),
  },
  boxBirthday: {
    ...Platform.select({
      ios: {
        top: 15,
        right: 60,
        flex: 1,
        alignItems: "stretch",
      },
      android: {
        top: 15,
        right: 55,
        flex: 1,
        alignItems: "stretch",
      },
      default: {
        top: 15,
        right: 58,
        flex: 1,
        alignItems: "stretch",
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
  boxPhone: {
    ...Platform.select({
      ios: {
        top: 15,
        right: 105,
        flex: 1,
        alignItems: "stretch",
      },
      android: {
        top: 15,
        right: 99,
        flex: 1,
        alignItems: "stretch",
      },
      default: {
        top: 15,
        right: 101,
        flex: 1,
        alignItems: "stretch",
      },
    }),
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
    color: "black",
  },
  CircleShapeView: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        left: 40,
        bottom: 100,
      },
      android: {
        elevation: 2,
        left: 40,
        bottom: 100,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        left: 40,
        bottom: 100,
      },
    }),
  },
  userInfoSection: {
    alignItems: "center",
    marginBottom: 5,
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
  profileChangeText: {
    ...Platform.select({
      ios: {
        alignItems: "center",
      },
      android: {
        marginLeft: 5,
      },
      default: {
        left: 90,
      },
    }),
    left: 90,
    fontSize: 16,
    color: "#C0C0C0",
  },
  button: {
    backgroundColor: "#006400",
    borderColor: "#006400",
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
    marginTop: 10,
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
    marginLeft: 45,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: "75%",
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
    color: "#fff",
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
    fontSize: 24,
  },
});

export default SettingsScreen;
