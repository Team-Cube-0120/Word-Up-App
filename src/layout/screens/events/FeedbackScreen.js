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
import FilterCard from "../../../components/card/FilterCard";
import ApiService from "../../../service/api/ApiService";

class FeedbackScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            feedback: [],
        };
    }

    componentDidMount() {
        this.fetchFeedback();
    }

    fetchFeedback() {
        ApiService.get("data/getAllFeedback?collection=feedback")
            .then((feedback) => {
                this.setState({ isLoading: false, feedback: feedback, refreshing: false });
            })
            .catch((error) => {
                this.setState({
                    feedback: <Text>Error Retrieving Data {error}</Text>,
                    refreshing: false,
                });
            });
    }

    async onRefresh() {
        this.setState({ refreshing: true });
        this.fetchFeedback();
    }

    openFilterDialog() {
        this.setState({ isFilterDialogOpen: true });
    }

    closeFilterDialog() {
        this.setState({ isFilterDialogOpen: false });
    }

    render() {
        const navigation = this.props.navigation;
        let feedbacklist =
            this.state.feedback.length > 0 ? (
                this.state.feedback.map((feedback, index) => (
                    <TouchableOpacity
                        key={index}
                    >
                        <FilterCard title={feedback.name} data={feedback} />
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
                    {feedbacklist}
                </ScrollView>
                
            </View>
        );
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

export default FeedbackScreen;
