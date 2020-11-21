import React, { Component } from "react";
import {
    TouchableOpacity,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Platform,
    Switch,
    Alert,
    Image,
    ActivityIndicator,
} from "react-native";
import { Title, Caption, Text } from "react-native-paper";
import profileImage from "../../../../assets/profile.png";
import { firebase } from "../../../../server/config/firebase/firebaseConfig";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";

const screenWidth = Math.round(Dimensions.get("window").width);

class AdminPortalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fullname: "",
            email: "",
            admin: false,
            profileImageUrl: "",
            notifications: "",
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity
                        style={styles.infoBoxWrapper}
                        onPress={() => this.props.navigation.navigate("ManageAccounts")}
                    >
                        <MaterialCommunityIconsIcon
                            name="account-multiple-outline"
                            style={styles.icons}
                        ></MaterialCommunityIconsIcon>
                        <View>
                            <Title style={styles.menuTitleM}>Manage User Accounts</Title>
                            <MaterialCommunityIconsIcon
                                name="arrow-right"
                                style={styles.arrow}
                            ></MaterialCommunityIconsIcon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.infoBoxWrapper}
                        onPress={() => this.props.navigation.navigate("ViewFeedBackScreen")}
                    >
                        <MaterialCommunityIconsIcon
                            name="comment-account"
                            style={styles.icons}
                        ></MaterialCommunityIconsIcon>
                        <View>
                            <Title style={styles.menuTitleM}>View Feedback</Title>
                            <MaterialCommunityIconsIcon
                                name="arrow-right"
                                style={styles.arrow}
                            ></MaterialCommunityIconsIcon>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    userInfoSection: {
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        alignItems: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: "500",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 0.8,
        flexDirection: "row",
        height: 80,
        alignItems: "center",
        width: "90%",
        marginLeft: screenWidth / 20,
        // justifyContent: "center"
    },
    menuTitleM: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginLeft: 15,
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#FF0000",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
            default: {
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 2,
            },
        }),
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    arrow: {
        ...Platform.select({
            ios: {
                left: 275,
            },
            android: {
                left: 310,
            },
            default: {
                left: 290,
            },
        }),
        position: "absolute",
        color: "#006400",
        fontSize: 32,
    },
    switch: {
        left: screenWidth - 120,
        position: "absolute",
        color: "#006400",
        fontSize: 32,
    },
    divider: {
        width: screenWidth,
        height: 1,
        backgroundColor: "#E6E6E6",
        shadowColor: "rgba(155,155,155,1)",
        shadowOffset: {
            height: 1,
            width: 0,
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
        marginTop: 3,
    },
    icons: {
        color: "#70AF1A",
        fontSize: 32,
    },
});

export default AdminPortalScreen;
