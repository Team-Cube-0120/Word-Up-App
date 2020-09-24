import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import BaseCard from './BaseCard';
import { View, Text, StyleSheet, TextInput, ScrollView, Button , Platform} from 'react-native';
import PropTypes from 'prop-types';

class EventCard extends BaseCard {
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
                <Text></Text>
            </View>

            <View style = {styles.containerStyle}>
                    <Text style = {styles.cardTitle}>{this.props.title}</Text>
                    {fields}
            </View>
            
            {/* <View style={styles.rightBox}>
                <Text></Text>
            </View> */}
        </View>
        );
    }

    renderCardViews() {
        if(this.props.data.eventType == 'Outdoor'){
            styles.rightBox = {
                width: '8%',height: 150, backgroundColor: 'green', padding:10,
            }
        } else if (this.props.data.eventType == 'Party'){
            styles.rightBox = {
            width: '8%',height: 150, backgroundColor: 'salmon', padding:10,
            }
        } else if (this.props.data.eventType == 'Food'){
            styles.rightBox = {
            width: '8%',height: 150, backgroundColor: 'lightblue', padding:10,
            }
        } else if (this.props.data.eventType == 'Meeting'){
            styles.rightBox = {
            width: '8%',height: 150, backgroundColor: 'red', padding:10,
            }
        }
        return (
            <View>
                <View style={styles.containerView}>
                    <Text style={styles.labels}>Event Name:</Text>
                    <Text>{this.props.data.eventName}</Text>
                </View>
                <View style={styles.containerView}>
                    <Text style={styles.labels}>Event Type:</Text>
                    <Text  style={styles.labels} >{this.props.data.eventType}</Text>
                </View>
                <View style={styles.containerView}>
                    <Text style={styles.labels}>Location:</Text>
                    <Text>{this.props.data.location}</Text>
                </View>
            </View>
        )
        
    }
}

    const styles = StyleSheet.create({
        containerView: {
            width: '100%',
            flexDirection: 'row',
        },
        containerStyle: {
            width: '90%', height: 150, backgroundColor: 'white', padding:10,
            ...Platform.select({
                ios: {
                  shadowColor: "#000",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 3,
                  shadowRadius: 2,
                },
                android: {
                  shadowColor: "black",
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 3,
                  shadowRadius: 3,
                  elevation: 2,
                },
                default: {
                  shadowColor: "black",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 3,
                  shadowRadius: 2,
                  elevation: 2,
                },
              }),
        },
        containerStyleCard: {
            backgroundColor: 'powderblue'
        },
        
        labels: {
            fontWeight: 'bold',
            marginRight: '3%'
        },
    
        cardTitle: {
            textAlign: 'left',
            borderBottomWidth :5,
            borderBottomColor: '#000',
        },
        rightBox:{
            width: '8%',height: 150, backgroundColor: 'salmon', padding:10,
        }
    });

export default EventCard;