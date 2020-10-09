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
        left: '1%'
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
        fontWeight: 'bold',
        marginBottom: '3%'
    },

    datePostedText: {
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: '5%'
    },

    companyInfo: {
        fontSize: 16
    },

    companyImageView: {
        marginBottom: '1%'
    },

    companyImage: {
        height: 80,
        width: 80,
        borderRadius: 10
    }
});


export default BaseCard;