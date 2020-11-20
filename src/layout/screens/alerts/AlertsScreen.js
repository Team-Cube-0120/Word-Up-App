import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlertCard from "../../../components/card/AlertCard";
import ApiService from "../../../service/api/ApiService";



class AlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      alerts: [],
    };
  }

  componentDidMount() {
    this.fetchAllalerts();
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
              this.props.navigation.push("ViewAlert", { alertInfo: alert })
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateAlerts")}
        >
          <Text style={styles.btnText}>Create Alert</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: '#FAFAFA',
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

