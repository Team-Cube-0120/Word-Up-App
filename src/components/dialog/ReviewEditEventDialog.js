import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Input } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';

class ReviewEditEventDialog extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        data: PropTypes.object
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title style={styles.dialogTitle}>Confirm Edited Information</Dialog.Title>
                    <ScrollView>
                        <Card style={styles.cardView}>
                            <View style={styles.containerView}>
                                <Text style={styles.title}>Position: </Text>
                                <Text style={styles.value}>{this.props.data.eventName}</Text>
                            </View>
                            
                        </Card>
                    </ScrollView>
                    <Dialog.Button label="Close" onPress={this.props.onClose}></Dialog.Button>
                    <Dialog.Button label="Submit" onPress={this.props.onSubmit}></Dialog.Button>
                    <ActivityIndicator animating={this.props.data.isLoading} />
                </Dialog.Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardView: {
        width: '100%'
    },

    dialogTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    containerView: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: '3%',
        alignItems: 'center',
    },

    containerViewMultiLine: {
        width: '100%',
        marginBottom: '3%',
    },

    title: {
        fontWeight: 'bold',
        marginRight: '1%',
        fontSize: 16
    },

    value: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap'
    },

    buttonView: {
        flexDirection: 'column',
        width: '100%',
        height: 150, // might be a problem for other screens
        justifyContent: 'space-evenly'
    },

    buttonLeft: {

    },

    buttonRight: {
        alignSelf: 'stretch',
    }
});


export default ReviewEditEventDialog;