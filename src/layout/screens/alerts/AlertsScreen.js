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
  Platform,
  TouchableHighlight,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlertCard from "../../../components/card/AlertCard";
import ApiService from "../../../service/api/ApiService";
import { FAB } from "react-native-paper";
import FilterAlertDialog from '../../../components/dialog/FilterAlertDialog';
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData, storeData } from "../../../util/LocalStorage";
import { Icon } from "react-native-elements";
import moment from "moment";
LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class AlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      alerts: [],
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: 'All',
      data: "",
    };
  }

  componentDidMount() {
    this.fetchAlerts();
    this.fetchAllUsers();
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          style={{ backgroundColor: "#70AF1A", marginRight: 15 }}
          onPress={() => this.openFilterDialog()}
        >
          <View style={{ backgroundColor: "#70AF1A" }}>
            <Icon name="filter-list" size={34} color="white" />
          </View>
        </TouchableHighlight>
      ),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.route.params);
    if (this.props.route.params != null && this.props.route.params.isAlertCreated) {
      this.fetchAlerts();
      this.fetchAllUsers();
      this.props.route.params.isAlertCreated = false;
    }
  }
  
  fetchAllUsers() {
    ApiService.get("data/getAll?collection=users")
      .then(async (users) => {
        let userMap = new Map();
        users.forEach((user, index) =>
          userMap.set(user.profile.id, user.profile)
        );
        this.setState({ users: userMap });
        return;
      })
      .catch((error) => console.log("error retrieving data"));
  }

  fetchAlerts() {
    if (this.state.filterOption == 'All') {
      this.fetchAllalerts();
    } else if (this.state.filterOption == 'My Alerts') {
      this.filterByOther();
    } else {
      this.fetchFilteredAlerts();
    }

  }

  fetchAllalerts() {
    ApiService.get("data/getAll?collection=alerts")
      .then((alerts) => {
        this.setState({ isLoading: false, alerts: alerts, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          alerts: <Text style={{ fontFamily: font }}>Error Retrieving Data {error}</Text>,
          refreshing: false,
        });
      });
  }

  async filterByOther() {
    let userInfo = await getData(USERINFO);
    let formattedFilterOption = userInfo.id;
    ApiService.get("data/filter/other/get?collection=alerts&filterOption=" + formattedFilterOption)
      .then((alerts) => {
        this.setState({ isLoading: false, alerts: alerts, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          alerts: <Text style={{ fontFamily: font }}>You have created no Alerts yet!{error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async fetchFilteredAlerts() {
    ApiService.get(
      "data/filterAlerts/get?collection=alerts&filterOption=" + this.state.filterOption
    )
      .then((alerts) => {
        this.setState({ isLoading: false, alerts: alerts, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          alerts: <Text style={{ fontFamily: font }}>Error Retrieving Data {error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }


  async filterEvents(selectedValue) {
    this.setState({ filterOption: selectedValue, isLoading: true }, () => {
      this.closeFilterDialog();
      this.fetchAlerts();
    });
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchAllalerts();
    this.fetchAllUsers();
  }

  openFilterDialog() {
    this.setState({ isFilterDialogOpen: true });
  }

  closeFilterDialog() {
    this.setState({ isFilterDialogOpen: false });
  }


  render() {
    const navigation = this.props.navigation;
    let alertList =
      this.state.alerts.length > 0 && this.state.users.size > 0 ? (
        this.state.alerts.map((alert, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.props.navigation.push("ViewAlert", {
                alertInfo: alert,
                userInfo: this.state.users.get(alert.userId)
              })
            }
          >
            <AlertCard 
             title={alert.name}
             data={alert} 
             userInfo={this.state.users.get(alert.userId)} />
          </TouchableOpacity>
        ))
      ) : (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>No alerts available at this time</Text>
          </View>
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
       
        <FilterAlertDialog
          onSubmit={(selectedValue) => this.filterEvents(selectedValue)}
          onClose={() => this.closeFilterDialog()}
          filterOption={this.state.filterOption}
          visible={this.state.isFilterDialogOpen}
        ></FilterAlertDialog>

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
  errorText: {
    fontFamily: font,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
});

export default AlertsScreen;
