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
import FilterAlertDialog from '../../../components/dialog/FilterAlertDialog';
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
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: 'All',
      data: "",
    };
  }

  componentDidMount() {
    this.fetchAlerts();
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


  fetchAlerts() {    
    if(this.state.filterOption == 'All'){
      this.fetchAllalerts();
    } else if (this.state.filterOption == 'My Alerts'){
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
          alerts: <Text>Error Retrieving Data {error}</Text>,
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
          alerts: <Text>You have created no Alerts yet!{error}</Text>,
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
          alerts: <Text>Error Retrieving Data {error}</Text>,
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
          style={styles.filter}
          medium
          animated={true}
          color="#fff"
          icon="filter"
          theme={{ colors: { accent: "#70AF1A" } }}
          onPress={() => this.openFilterDialog()}
        />
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
});

export default AlertsScreen;
