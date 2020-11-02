import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';

class EventComments extends Component {
    constructor(props) {
        super(props);
        let eventInfo = this.props.route.params.eventInfo;
        this.state = {
            commentValue: "",
            data: [
                { id: '1', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '2', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
                { id: '3', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '4', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
                { id: '5', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '6', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
                { id: '7', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '8', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
                { id: '9', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '10', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
                { id: '11', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '12', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
                { id: '13', name: "John Doe", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Hello World" },
                { id: '14', name: "Melissa Jenkins", image: "https://bootdey.com/img/Content/avatar/avatar1.png", comment: "Welcome to our test comment" },
            ]
        }
    }

    addComment(id, name, image, comment) {
        let newComment = {id: id, name: name, image: image, comment: comment};
        let oldData = this.state.data;
        oldData.push(newComment);
        this.setState({data: oldData});
    }

    render() {
        return (
            <View>
                <View>
                    <Text>Event Name</Text>
                </View>
                <View>
                    <FlatList
                        style={styles.root}
                        data={this.state.data}
                        ref={(ref)=> {this.flatListView = ref}}
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
                                            <Text>{item.item.name}</Text>
                                            <Text>9:58 am</Text>
                                        </View>
                                        <Text>{item.item.comment}</Text>
                                    </View>
                                </View>
                            )
                        }}>
                    </FlatList>
                </View>
                <View>
                    <TextInput
                        style={styles.comment}
                        multiline={true}
                        placeholder={"Enter text here"}
                        onChangeText={(comment) => this.setState({commentValue: comment})}></TextInput>
                </View>
                <View style={styles.commentButton}>
                    <Button title="Back" onPress={() => this.props.navigation.goBack()}></Button>

                    <Button 
                        title="Comment" 
                        onPress={() => this.addComment("15", "Test User", "https://bootdey.com/img/Content/avatar/avatar1.png", this.state.commentValue)}></Button>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        height: '75%'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '25%',
        alignItems: 'center',
        width: '50%',
        marginTop: '3%'
    }

});

export default EventComments;