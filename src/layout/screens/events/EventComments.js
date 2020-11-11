import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import ApiService from "../../../service/api/ApiService";
import RequestOptions from '../../../service/api/RequestOptions';
import UuidGenerator from '../../../util/UuidGenerator';
import { getData } from '../../../util/LocalStorage';
import { USERINFO } from '../../../enums/StorageKeysEnum';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

class EventComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventInfo: this.props.route.params.eventInfo,
            // errorView here
            isLoading: false,
            commentValue: "",
            comments: []
        }
    }

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments() {
        if (!this.state.isLoading) {
            this.setState({ isLoading: true })
        }
        ApiService.get('data/comments/get?collection=events&document=' + this.state.eventInfo.eventId)
            .then((comments) => {
                this.setState({ comments: comments, isLoading: false, commentValue: "" });
            })
            .catch((error) => {
                // have error view here when comments cannot be loaded
            });
    }

    addComment(commentValue) {
        this.setState({ isLoading: true }, () => {
            this.constructNewComent(commentValue)
                .then((newComment) => RequestOptions.setUpRequestBody("events", this.state.eventInfo.eventId, newComment))
                .then((body) => ApiService.update('data/comments/add', body))
                .then((response) => this.fetchComments())
                .catch((error) => {
                    console.log("error: " + JSON.stringify(error));
                    // have error view here
                })
        })
    }

    async constructNewComent(commentValue) {
        return new Promise(async (resolve) => {
            let currentUser = await getData(USERINFO);
            let newComment = {
                id: await UuidGenerator.generateUuid(),
                name: currentUser.profile.fullname,
                image: currentUser.profile.profileImageUrl,
                comment: commentValue
            }
            resolve(newComment);
        })
    }

    render() {
        return (
            <View>
                <View>
                    <FlatList
                        style={styles.root}
                        data={this.state.comments}
                        ref={(ref) => { this.flatListView = ref }}
                        onContentSizeChange={() => this.flatListView.scrollToEnd({ animated: true })}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}></View>
                            )
                        }}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={(item) => {
                            return (
                                <View style={styles.container}>
                                    <TouchableOpacity
                                        onPress={() => { }}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.item.image }}>
                                        </Image>
                                    </TouchableOpacity>
                                    <View style={styles.content}>
                                        <View style={styles.contentHeader}>
                                            <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
                                            <Text style={{fontStyle: 'italic'}}>{item.item.datePosted}</Text>
                                        </View>
                                        <Text>{item.item.comment}</Text>
                                    </View>
                                </View>
                            )
                        }}>
                    </FlatList>
                    <ScrollView style={{height: 200}}>
                        <TextInput
                            style={styles.comment}
                            multiline={true}
                            value={this.state.commentValue}
                            placeholder={"Enter comment here"}
                            onChangeText={(comment) => this.setState({ commentValue: comment })}></TextInput>
                        <View style={styles.commentButton}>
                            <Button
                                title="Comment"
                                onPress={() => this.addComment(this.state.commentValue)}></Button>
                            <Button title="Back" onPress={() => this.props.navigation.goBack()}></Button>
                        </View>
                        <View style={styles.activityContainer}>
                                <ActivityIndicator
                                    size="large"
                                    color="#70AF1A"
                                    animating={this.state.isLoading}
                                />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        height: '67%'
    },

    comment: {
        marginBottom: 0
    },

    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },

    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 20
    },

    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },

    content: {
        marginLeft: 16,
        flex: 1
    },

    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    },

    commentButton: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: '9%',
        // alignItems: 'center',
        height: 90,
        width: '80%',
        marginTop: '3%',
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '3%'
    },

});

export default EventComments;