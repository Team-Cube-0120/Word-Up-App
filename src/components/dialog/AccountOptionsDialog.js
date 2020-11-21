import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Card, Avatar, Input } from "react-native-elements";
import Dialog from "react-native-dialog";
import PropTypes from "prop-types";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class AccountOptionsDialog extends Component {
  static propTypes = {
    onAdminSubmit: PropTypes.func,
    onDisableEnableSubmit: PropTypes.func,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    userInfo: PropTypes.object,
    isSubmitting: PropTypes.bool,
    dialogLabels: PropTypes.object
  };

  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.userInfo == null) {
      return (
        <View>
          {/* <Dialog.Container>
            <Dialog.Title>N/A</Dialog.Title>
          </Dialog.Container> */}
        </View>
      )
    } else {
      return (
        <View>
          <Dialog.Container
            contentStyle={{ width: screenWidth - 25 }}
            visible={this.props.visible}
          >
            <Dialog.Title style={styles.dialogTitle}>Profile</Dialog.Title>
            <ScrollView>
              <View style={styles.cardTitle}>
                <Avatar
                  rounded
                  source={{
                    uri: this.props.userInfo.profile.profileImageUrl,
                  }}
                />
                <Text style={styles.userTitle}>
                  {this.props.userInfo.fullname}
                </Text>
              </View>
              <View>
                <Text>Email: {this.props.userInfo.profile.email}</Text>
              </View>
              <View>
                <Text>Phone Number: {this.props.userInfo.profile.phoneNum}</Text>
              </View>
              <View>
                <Text>Location: {this.props.userInfo.profile.location}</Text>
              </View>
              <View>
                <Text>Gender: {this.props.userInfo.profile.gender}</Text>
              </View>
              <View>
                <Text>Is admin user? {this.props.dialogLabels.isAdmin}</Text>
              </View>
              <View>
                <Text>Is account disabled? {this.props.dialogLabels.isDisabled}</Text>
              </View>
            </ScrollView>
            <ActivityIndicator
              style={{ marginTop: '2%', marginBottom: '2%' }}
              size="large"
              color="#70AF1A"
              animating={this.props.isSubmitting}></ActivityIndicator>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Dialog.Button
                color="gray"
                label="Close"
                onPress={() => this.props.onClose()}
              ></Dialog.Button>
              <Dialog.Button
                color="#006400"
                label={this.props.dialogLabels.disableButtonLabel}
                onPress={() => this.props.onDisableEnableSubmit()}
              ></Dialog.Button>
              <Dialog.Button
                color="#006400"
                label={this.props.dialogLabels.adminButtonLabel}
                onPress={() => this.props.onAdminSubmit()}
              ></Dialog.Button>
            </View>
          </Dialog.Container>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cardView: {
    width: "100%",
  },

  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },

  containerView: {
    width: "100%",
    flexDirection: "row",
    marginBottom: "3%",
    alignItems: "center",
  },

  containerViewMultiLine: {
    width: "100%",
    marginBottom: "3%",
  },

  title: {
    fontWeight: "bold",
    marginRight: "1%",
    fontSize: 16,
  },

  value: {
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap",
  },

  buttonView: {
    flexDirection: "column",
    width: "100%",
    height: 150, // might be a problem for other screens
    justifyContent: "space-evenly",
  },

  buttonRight: {
    alignSelf: "stretch",
  },

  cardShadows: {
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

  containerView: {
    left: '1%'
  },

  labels: {
    marginRight: '2%'
  },

  cardTitle: {
    textAlign: 'left',
    flexDirection: 'row',
    marginBottom: '5%'
  },

  userTitle: {
    marginLeft: '3%',
    marginTop: '2%'
  },

  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '3%'
  },

  datePostedText: {
    textAlign: 'right',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: '5%'
  },

  companyInfo: {
    fontSize: 16
  },

  companyImageView: {
    marginBottom: '1%'
  },

  companyImage: {
    height: 80,
    width: 80,
    borderRadius: 10
  }
});

export default AccountOptionsDialog;
