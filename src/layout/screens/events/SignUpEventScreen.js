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

class SignUpEventScreen extends Component {
    constructor(props) {
        super(props);
        let eventInfo = this.props.route.params.eventInfo;
        this.state = {
            eventInfo: eventInfo,
            editButtonView: <View></View>,
            deleteEventView: <View></View>,
            signUpButtonView: <View></View>,
            isLoading: false,
            toggleDialog: false,
        }
    }


    render() {
        if (this.state.eventInfo.signedUp) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.push("ViewEvent", { eventInfo: this.state.eventInfo })
                            }
                        >
                            <EventCard title={this.state.eventInfo.eventName} data={this.state.eventInfo} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        
                    </ScrollView>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "#36485f",
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

export default SignUpEventScreen;
