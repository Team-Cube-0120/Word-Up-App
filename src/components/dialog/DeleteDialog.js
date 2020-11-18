import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';

class DeleteDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
                    <Dialog.Button style={{marginRight: '20%'}} label="No" onPress={this.props.onClose}></Dialog.Button>
                    <Dialog.Button label="Yes" onPress={this.props.onSubmit}></Dialog.Button>
                </Dialog.Container>
            </View>
        )
    }
}

export default DeleteDialog;