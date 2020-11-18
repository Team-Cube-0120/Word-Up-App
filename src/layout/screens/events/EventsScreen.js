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

class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      events: [],
    };
  }

  componentDidMount() {
    this.fetchAllEvents();
    this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      () => {
        this.fetchAllEvents();
      }
    );
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

  async onRefresh() {
    this.setState({ refreshing: true });
    this.fetchAllEvents();
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
          style={styles.fab}
          medium
          animated={true}
          color="#fff"
          icon="plus"
          label={"Create Event"}
          theme={{ colors: { accent: "#70AF1A" } }}
          onPress={() => navigation.navigate("CreateEvent")}
        />

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateEvent")}
        >
          <Text style={styles.btnText}>Create Event</Text>
        </TouchableOpacity> */}
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
});

export default EventsScreen;
