import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import AccountCard from "../../../components/card/AccountCard";
import ApiService from "../../../service/api/ApiService";
import profileImage from "../../../../assets/profile.png";
import { FAB, TextInput } from "react-native-paper";
import React, { Component } from "react";
import AccountOptionsDialog from "../../../components/dialog/AccountOptionsDialog";
import { getData } from "../../../util/LocalStorage";
import RequestOptions from "../../../service/api/RequestOptions";
import { ALL_TIME, MY_JOBS } from "../../../enums/FilterOptionsEnum";
import { formatFilterOption } from "../../../formatter/FilterJobsFormatter";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import { Input, SearchBar } from "react-native-elements";


class ManageAccountsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            didUpdate: false,
            isLoading: true,
            refreshing: false,
            selectedUser: null,
            isSubmitting: false,
            users: [],
            copyUsers: [],
            isAccountDialogOpen: false,
            dialogLabels: {
                adminButtonLabel: "N/A",
                disableButtonLabel: "N/A",
                isAdmin: "N/A",
                isDisabled: "N/A"
            }
        };

        this.filterResults = [];
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.didUpdate) {
            this.fetchAllUsers();
            this.state['didUpdate'] = false;
        }
    }

    fetchAllUsers() {
        ApiService.get("data/getAll?collection=users")
            .then(async (users) => {
                let loggedInUser = await getData(USERINFO);
                users = users.filter((user) => {
                    return user.fullname != loggedInUser.fullname;
                })
                this.setState({ users: users, copyUsers: users, isLoading: false, refreshing: false });
                this.filterResults = users;
            })
            .catch((error) => console.log("error retrieving data" + error));
    }

    changeAdminStatus(user) {
        this.setState({ isSubmitting: true });
        RequestOptions.setUpRequestBody('users', user.id, { admin: !user.admin })
            .then((body) => ApiService.update('data/update', body))
            .then((response) => {
                // user.admin = !user.admin;
                this.setState({ didUpdate: true, isAccountDialogOpen: false, isSubmitting: false }, () => {
                    alert("Admin status changed successfully");
                    // this.fetchAllUsers();
                });
            }).catch(() => {
                this.setState({ isSubmitting: false }, () => {
                    alert("Error changing admin status. Please try again");
                });
            });
    }

    changeDisabledStatus(user) {
        this.setState({ isSubmitting: true });
        RequestOptions.setUpRequestBody('users', user.id, { isDisabled: !user.isDisabled })
            .then((body) => ApiService.update('data/update', body))
            .then((response) => {
                this.setState({ didUpdate: true, isAccountDialogOpen: false, isSubmitting: false }, () => {
                    alert("Account status changed successfully");
                    // this.fetchAllUsers();
                });
            }).catch(() => {
                this.setState({ isSubmitting: false }, () => {
                    alert("Error changing account status. Please try again");
                });
            });
    }

    async onRefresh() {
        this.setState({ refreshing: true });
        this.fetchAllUsers();
    }

    searchFilter = text => {
        if (text.length == 0) {
            this.setState({ users: this.state.copyUsers });
        } else {
            const filterData = this.filterResults.filter((user) => {
                let itemData = user.fullname.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.includes(textData);
            });
            if (filterData.length == 0) {
                this.setState({ users: this.state.copyUsers });
            } else {
                this.setState({ users: filterData });
            }
        }
    }

    renderHeader = () => {
        return (
            <TextInput
                placeholder="Search account name"
                onChangeText={text => this.searchFilter(text)}
                autoCorrect={false}>
            </TextInput>
        );
    }

    openAccountDetailsDialog(user) {
        this.state['dialogLabels']['adminButtonLabel'] = (user.admin) ? "Remove Admin" : "Make Admin";
        this.state['dialogLabels']['disableButtonLabel'] = (user.isDisabled) ? "Enable Account" : "Disable Account";
        this.state['dialogLabels']['isAdmin'] = (user.admin) ? "Yes" : "No";
        this.state['dialogLabels']['isDisabled'] = (user.isDisabled) ? "Yes" : "No";
        this.setState({ selectedUser: user, isAccountDialogOpen: true });
    }

    closeAccountDetailsDialog() {
        this.setState({ isAccountDialogOpen: false });
    }

    render() {
        let userList =
            this.state.users.length > 0 ?
                (
                    // this.state.users.map((user, index) => (
                    //     <TouchableOpacity
                    //         style={styles.cardShadows}
                    //         key={index}
                    //         onPress={() => this.openAccountDetailsDialog(user)}
                    //     >
                    //         <AccountCard
                    //             userInfo={user}
                    //         />
                    //     </TouchableOpacity>
                    // ))
                    <FlatList
                        data={this.state.users}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                            />}
                        renderItem={({ item }, index) => (
                            <TouchableOpacity
                                style={styles.cardShadows}
                                key={index}
                                onPress={() => this.openAccountDetailsDialog(item)}
                            >
                                <AccountCard
                                    userInfo={item}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={this.renderHeader}></FlatList>
                ) : (
                    <View style={styles.errorView}>
                        <Text style={styles.errorText}>No users available at this time</Text>
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
        } else {
            return (
                <View style={styles.container}>
                    {userList}
                    {/* <FlatList
                        data={this.state.filterResults}
                        renderItem={({ user }, index) => (
                            <TouchableOpacity
                                style={styles.cardShadows}
                                key={index}
                                onPress={() => this.openAccountDetailsDialog(user)}
                            >
                                <AccountCard
                                    userInfo={user}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={user => user.fullname}
                        ListHeaderComponent={this.renderHeader}></FlatList> */}
                    {/* <ScrollView
                    
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                            />
                        }
                    >
                        {userList}
                    </ScrollView> */}

                    <AccountOptionsDialog
                        onAdminSubmit={() => this.changeAdminStatus(this.state.selectedUser)}
                        onDisableEnableSubmit={() => this.changeDisabledStatus(this.state.selectedUser)}
                        onClose={() => this.closeAccountDetailsDialog()}
                        visible={this.state.isAccountDialogOpen}
                        userInfo={this.state.selectedUser}
                        isSubmitting={this.state.isSubmitting}
                        dialogLabels={this.state.dialogLabels}
                    ></AccountOptionsDialog>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "#FAFAFA",
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
    header: {
        fontSize: 24,
        color: "#36485f",
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomColor: "#36485f",
        borderBottomWidth: 1,
        alignSelf: "center",
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
    },

    errorView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%",
    },

    errorText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    addJobParentView: {
        alignSelf: "flex-end",
        marginRight: 20,
        marginBottom: 20,
    },

    touchableOpacityView: {
        width: 75,
        height: 75,
    },

    floatingButton: {
        position: "absolute",
        width: 75,
        height: 75,
    },

    filter: {
        position: "absolute",
        margin: 16,
        right: 0,
        ...Platform.select({
            ios: {
                bottom: "9.5%",
            },
            android: {
                bottom: "11%",
            },
            default: {
                bottom: "11%",
            },
        }),
    },

    cardShadows: {
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
    },
});

export default ManageAccountsScreen;
