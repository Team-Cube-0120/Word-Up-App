import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';

class DeleteDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        isSubmitting: PropTypes.bool
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
                    <View style={{ flexDirection: 'row-reverse',}}>
                        <Dialog.Button label="Yes" onPress={this.props.onSubmit}></Dialog.Button>
                        <Dialog.Button style={{ marginRight: '10%' }} label="No" onPress={this.props.onClose}></Dialog.Button>
                        <ActivityIndicator
                            size="large"
                            color="#70AF1A"
                            animating={this.props.isSubmitting}
                            style={{ marginRight: '10%' }}
                        />
                    </View>
                </Dialog.Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityContainer: {

    }
});

export default DeleteDialog;