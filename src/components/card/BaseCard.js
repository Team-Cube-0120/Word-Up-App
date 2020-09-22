import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

class BaseCard extends Component {
    constructor(props) {
        super(props)
        this.styles = styles;
    }

    // add methods/attributes that are fundamental to all inherited members
}

const styles = StyleSheet.create({
    containerView: {
        width: '100%',
        flexDirection: 'row',
    },

    labels: {
        fontWeight: 'bold',
        marginRight: '3%'
    },

    cardTitle: {
        textAlign: 'left'
    }
});


export default BaseCard;