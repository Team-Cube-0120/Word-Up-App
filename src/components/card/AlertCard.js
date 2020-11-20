import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import BaseCard from './BaseCard';
import { View, Text, StyleSheet, TextInput, ScrollView, Button , Platform} from 'react-native';
import PropTypes from 'prop-types';

class AlertCard extends BaseCard {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.object
    }

    constructor(props) {
        super(props)
    }

    render() {
        let fields = this.renderCardViews();
        return (
        
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
            <View style={styles.rightBox}>
                <Text style = {styles.cardTitle}>{this.props.title}</Text>
            </View>

            <View style = {styles.containerStyle}>
                    {fields}
            </View>
            
        </View>
        );
    }

    renderCardViews() {
        // if(this.props.data.eventType == 'Outdoor'){
        //     styles.rightBox = {
        //         width: '8%',height: 150, backgroundColor: 'green', padding:10,
        //     }
        // } else if (this.props.data.eventType == 'Party'){
        //     styles.rightBox = {
        //     width: '8%',height: 150, backgroundColor: 'salmon', padding:10,
        //     }
        // } else if (this.props.data.eventType == 'Food'){
        //     styles.rightBox = {
        //     width: '8%',height: 150, backgroundColor: 'lightblue', padding:10,
        //     }
        // } else if (this.props.data.eventType == 'Meeting'){
        //     styles.rightBox = {
        //     width: '8%',height: 150, backgroundColor: 'red', padding:10,
        //     }
        // }
        return (
            <View>
                <View style={styles.containerView}>
                    <Text style={styles.labels}>Alert Type:</Text>
                    <Text style = {styles.text}>{this.props.data.alertType}</Text>
                </View>
                <View style={styles.containerView}>
                    <Text style={styles.labels}>Severity:</Text>
                    <Text style = {styles.text}>{this.props.data.severity}</Text>
                </View>
            </View>
        )
        
    }
}

    const styles = StyleSheet.create({
        containerView: {
            width: '100%',
            flexDirection: 'row',
            paddingTop: 10
        },
        containerStyle: {
            width: '60%', height: 100, backgroundColor: 'white', padding:10,
        },
        containerStyleCard: {
            backgroundColor: 'powderblue'
        },
        
        labels: {
            fontWeight: 'bold',
            marginRight: '3%',
            fontSize: 16,
            color: 'darkblue',
        },
    
        cardTitle: {
            textAlign: 'center',
            borderBottomWidth :5,
            marginBottom: 10,
            borderBottomColor: '#000',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
        },
        rightBox:{
            width: '40%',height: 100, backgroundColor: 'salmon', padding:15, borderRadius:20
        },
        text:{
            fontSize: 16,
            fontWeight: 'bold',
        }
    });

export default AlertCard;