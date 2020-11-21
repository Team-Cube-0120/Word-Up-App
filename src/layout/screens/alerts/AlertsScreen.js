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
import { FAB } from "react-native-paper";
import FilterAlertDialog from '../../../components/dialog/FilterAlertDialog';
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData } from "../../../util/LocalStorage";


class AlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      alerts: [],
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: 'All'
    };
  }

  componentDidMount() {
    this.fetchAlerts();
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
    backgroundColor: 'white',
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

