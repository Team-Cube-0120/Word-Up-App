import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';

class SubmissionDialog extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        title: PropTypes.string,
        text: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>{this.props.title}</Dialog.Title>
                    <Dialog.Description>
                        {this.props.text}
                    </Dialog.Description>
                    <Dialog.Button label="Close" onPress={this.props.onClose}></Dialog.Button>
                </Dialog.Container>
            </View>
        )
    }
}

export default SubmissionDialog;