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
        marginRight: '2%'
    },

    cardTitle: {
        textAlign: 'left',
        flexDirection: 'row',
        marginBottom: '5%'
    },

    userTitle: { 
        marginLeft: '3%', 
        marginTop: '2%' 
    },

    jobTitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: '3%'
    }
});


export default BaseCard;