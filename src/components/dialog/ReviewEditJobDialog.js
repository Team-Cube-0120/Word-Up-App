import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Card, Input } from "react-native-elements";
import Dialog from "react-native-dialog";
import PropTypes from "prop-types";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class ReviewEditJobDialog extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Dialog.Container
          contentStyle={{ width: screenWidth - 25, height: screenHeight - 75 }}
          visible={this.props.visible}
        >
          <Dialog.Title style={styles.dialogTitle}>
            Confirm Edited Information
          </Dialog.Title>
          <ScrollView>
            <Card style={styles.cardView}>
              <View style={styles.containerView}>
                <Text style={styles.title}>Position: </Text>
                <Text style={styles.value}>{this.props.data.position}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerView}>
                <Text style={styles.title}>Job Type: </Text>
                <Text style={styles.value}>{this.props.data.jobType}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerView}>
                <Text style={styles.title}>Company: </Text>
                <Text style={styles.value}>{this.props.data.company}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>Job Description: </Text>
                <Text style={styles.value}>
                  {this.props.data.jobDescription}
                </Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>Job Application URL: </Text>
                <Text style={styles.value}>{this.props.data.jobAppUrl}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>Email: </Text>
                <Text style={styles.value}>{this.props.data.email}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>Phone Number: </Text>
                <Text style={styles.value}>{this.props.data.phoneNumber}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>Street: </Text>
                <Text style={styles.value}>{this.props.data.street}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>City: </Text>
                <Text style={styles.value}>{this.props.data.city}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>State: </Text>
                <Text style={styles.value}>{this.props.data.state}</Text>
              </View>
              <Card.Divider />
              <View style={styles.containerViewMultiLine}>
                <Text style={styles.title}>Zip: </Text>
                <Text style={styles.value}>{this.props.data.zip}</Text>
              </View>
            </Card>
          </ScrollView>
          <Dialog.Button
            color="#006400"
            label="Close"
            onPress={this.props.onClose}
          ></Dialog.Button>
          <Dialog.Button
            color="#006400"
            label="Submit"
            onPress={this.props.onSubmit}
          ></Dialog.Button>
          <ActivityIndicator animating={this.props.data.isLoading} />
        </Dialog.Container>
      </View>
    );
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
});

export default ReviewEditJobDialog;
