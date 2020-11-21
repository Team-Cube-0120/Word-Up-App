import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  LogBox,
  TouchableHighlight,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlertCard from "../../../components/card/AlertCard";
import ApiService from "../../../service/api/ApiService";
import { FAB } from "react-native-paper";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData, storeData } from "../../../util/LocalStorage";
import { Icon } from "react-native-elements";
import moment from "moment";
LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

class AlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      alerts: [],
      data: "",
    };
  }

  componentDidMount() {
    this.fetchAllalerts();
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          style={{ backgroundColor: "#70AF1A", marginRight: 15 }}
          onPress={() => cosole.log("filter-alerts")}
        >
          <View style={{ backgroundColor: "#70AF1A" }}>
            <Icon name="filter-list" size={34} color="white" />
          </View>
        </TouchableHighlight>
      ),
    });
  }

  fetchAllalerts() {
    ApiService.get("data/getAll?collection=alerts")
      .then((alerts) => {
        this.setState({ isLoading: false, alerts: alerts, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          alerts: <Text>Error Retrieving Data {error}</Text>,
          refreshing: false,
        });
      });
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchAllalerts();
  }

  render() {
    const navigation = this.props.navigation;
    let alertList =
      this.state.alerts.length > 0 ? (
        this.state.alerts.map((alert, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.props.navigation.push("ViewAlert", {
                alertInfo: alert,
                index: index,
              })
            }
          >
            <AlertCard title={alert.name} data={alert} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>Error Retrieving Data</Text>
      );

    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator
            size="large"
            color="#70AF1A"
            animating={this.state.isLoading}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        >
          {alertList}
        </ScrollView>

        <FAB
          style={styles.fab}
          medium
          animated={true}
          color="#fff"
          icon="plus"
          theme={{ colors: { accent: "#006400" } }}
          onPress={() => navigation.navigate("CreateAlerts")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 24,
    color: "#36485f",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "#36485f",
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  text: {
    position: "relative",
  },
  button: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 10,
  },
  btnText: {
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  floatingButton: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    backgroundColor: "black",
  },
});

export default AlertsScreen;
