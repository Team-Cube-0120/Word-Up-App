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
import EventCard from "../../../components/card/EventCard";
import ApiService from "../../../service/api/ApiService";
import { FAB } from "react-native-paper";
import FilterEventDialog from '../../../components/dialog/FilterEventDialog';
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData } from "../../../util/LocalStorage";



class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      events: [],
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: 'All'
    };
  }

  componentDidMount() {
    this.fetchEvents()
  }

  // componentDidUpdate(){
  //   this.fetchEvents()
  // }

  fetchEvents() {    
    if(this.state.filterOption == 'All'){
      this.fetchAllEvents();
    } else {
      this.fetchFilter();
    }
  }
  
  async fetchFilter() {
    if (this.state.filterOption == 'My Events') {
      alert(this.state.filterOption);
      this.filterByOther();
    } else {
      this.fetchFilteredEvents();
    }
  }

  fetchAllEvents() {
    ApiService.get("data/getAll?collection=events")
      .then((events) => {
        this.setState({ isLoading: false, events: events, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          events: <Text>Error Retrieving Data {error}</Text>,
          refreshing: false,
        });
      });
  }

  async filterByOther() {
    let userInfo = await getData(USERINFO);
    let formattedFilterOption = userInfo.id;
    ApiService.get("data/filter/other/get?collection=events&filterOption=" + formattedFilterOption)
      .then((events) => {
        this.setState({ isLoading: false, events: events, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          events: <Text>Error Retrieving Data {error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async fetchFilteredEvents() {
    ApiService.get(
      "data/filterEvents/get?collection=events&filterOption=" + this.state.filterOption
    )
      .then((events) => {
        this.setState({ isLoading: false, events: events, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          events: <Text>Error Retrieving Data {error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async filterEvents(selectedValue) {
    this.setState({ filterOption: selectedValue, isLoading: true }, () => {
      this.closeFilterDialog();
      this.fetchEvents();
    });
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchAllEvents();
  }

  openFilterDialog() {
    this.setState({ isFilterDialogOpen: true });
  }

  closeFilterDialog() {
    this.setState({ isFilterDialogOpen: false });
  }

  render() {
    const navigation = this.props.navigation;
    let eventList =
      this.state.events.length > 0 ? (
        this.state.events.map((event, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.props.navigation.push("ViewEvent", { eventInfo: event })
            }
          >
            <EventCard title={event.eventName} data={event} />
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
          {eventList}
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

        <FilterEventDialog
          onSubmit={(selectedValue) => this.filterEvents(selectedValue)}
          onClose={() => this.closeFilterDialog()}
          filterOption={this.state.filterOption}
          visible={this.state.isFilterDialogOpen}
        ></FilterEventDialog>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateEvent")}
        >
          <Text style={styles.btnText}>Create Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.btnText}>Signed Up Events</Text>
        </TouchableOpacity>
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
  addEventParentView: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
  },
});

export default EventsScreen;
