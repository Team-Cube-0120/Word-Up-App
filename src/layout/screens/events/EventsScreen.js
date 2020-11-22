import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Button,
  TouchableHighlight,
  LogBox,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventCard from "../../../components/card/EventCard";
import ApiService from "../../../service/api/ApiService";
import { FAB } from "react-native-paper";
import FilterEventDialog from "../../../components/dialog/FilterEventDialog";
import { Icon } from "react-native-elements";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { getData } from "../../../util/LocalStorage";

LogBox.ignoreLogs([
  "Warning: Cannot update a component from inside the function body of a different component.",
]);

class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      events: [],
      users: new Map(),
      isFilterDialogOpen: false,
      filterOption: "All",
    };
  }

  componentDidMount() {
    this.fetchEvents();
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
    console.log(this.props.route.params);
    if (this.props.route.params != null && this.props.route.params.isEventCreated) {
      this.fetchEvents();
      this.props.route.params.isEventCreated = false;
    }
  }

  fetchEvents() {
    if (this.state.filterOption == "All") {
      this.fetchAllEvents();
    } else if (this.state.filterOption == 'My Events'){
      this.filterByOther();
    } else if (this.state.filterOption == 'Signed Up Events'){
      this.filterBySigned();
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
          events: <Text>You have created no Events yet!{error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async filterBySigned() {
    let userInfo = await getData(USERINFO);
    let formattedFilterOption = userInfo.id;
    ApiService.get("data/filter/signed/get?collection=events&filterOption=" + formattedFilterOption)
      .then((events) => {
        this.setState({ isLoading: false, events: events, refreshing: false });
      })
      .catch((error) => {
        this.setState({
          events: <Text>You have created no Events yet!{error}</Text>,
          isLoading: false,
          refreshing: false,
        });
      });
  }

  async fetchFilteredEvents() {
    ApiService.get(
      "data/filterEvents/get?collection=events&filterOption=" +
        this.state.filterOption
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
    this.setState({ filterOption: selectedValue, isLoading: true, isFilterDialogOpen: false }, () => {
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
        <View style={styles.errorView}> 
          <Text style={styles.errorText}>No events available at this time</Text>
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
          {eventList}
        </ScrollView>

        <FilterEventDialog
          onSubmit={(selectedValue) => this.filterEvents(selectedValue)}
          onClose={() => this.closeFilterDialog()}
          filterOption={this.state.filterOption}
          visible={this.state.isFilterDialogOpen}
        ></FilterEventDialog>

        <FAB
          style={styles.fab}
          medium
          animated={true}
          color="#fff"
          icon="plus"
          label={"Create Event"}
          theme={{ colors: { accent: "#006400" } }}
          onPress={() => navigation.navigate("CreateEvent")}
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
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
  fab: {
    position: "absolute",
    width: 170,
    margin: 16,
    alignSelf: "center",
    bottom: -3,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
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
  filter: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  errorText: {
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

export default EventsScreen;
