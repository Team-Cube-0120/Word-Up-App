import React, { useState, Component } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, Input } from 'react-native-elements';
import PickerExample from './PickerExample';
import DateandTime from './DateandTime';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import UuidGenerator from '../../../util/UuidGenerator';


class CreateEventsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: 'N/A',
            details: 'N/A',
            location: 'N/A',
            rsvpCode: 'N/A',
            coHosts: 'N/A',
            eventType: 'N/A',
            eventId: 'N/A',
            isVisible: false,
            startDate: 'N/A',
            endDate: 'N/A',
            start: false,
            end: false,
        }
    }


    startState = () => {
        this.setState({
            start: true
           
        })
    }
    endState = () => {
        this.setState({
            start: false,
            end: true
           
        })
    }
    handlePicker =(datetime)=>{
        if(this.state.start){
            this.setState({
                isVisible: false,
                startDate: moment(datetime, 'MMMM, Do YYYY hh:mm A').format('MMMM, Do YYYY    hh:mm A')
            })
        } else if (this.state.end){
            this.setState({
                isVisible: false,
                endDate: moment(datetime, 'MMMM, Do YYYY hh:mm A').format('MMMM, Do YYYY    hh:mm A')
            })
            
        }
    }


    hidePicker =()=>{
        this.setState({
            isVisible: false
           
        })
    }
 
    showPicker =()=>{
        this.setState({
            isVisible: true
        })
    }
 

    render() {
        return (
            <ScrollView style={styles.container}>
                <Card>
                    <Card.Title>Create Event</Card.Title>
                    <Card.Divider />
                    <Text style={styles.text}>Event Name</Text>
                    <TextInput style={styles.textInput} placeholder="Event Name:"
                        onChangeText={(eventName) => this.setState({ eventName: eventName })}></TextInput>
                    <View>
                        <Button title="Select Start Date and Time" onPress={() => { this.startState(); this.showPicker(); }} />
                        <DateTimePickerModal
                            isVisible={this.state.isVisible}
                            mode="datetime"
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                        />
                    </View>

                    <View>
                        <Text style = {styles.textDate}>{this.state.startDate}</Text>
                    </View>
                    
                    <View>
                        <Button title="Select End Date and End Time" onPress={() => { this.endState(); this.showPicker(); }} />
                        <DateTimePickerModal
                            isVisible={this.state.isVisible}
                            mode="datetime"
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                        />
                    </View>

                    <View>
                        <Text style = {styles.textDate}>{this.state.endDate}</Text>
                    </View>
                    <View> 
                        <Text> </Text>
                    </View>
                    <Text style={styles.text}>Details</Text>
                    <TextInput style={styles.textInput} placeholder="Details:"
                        onChangeText={(details) => this.setState({ details: details })}></TextInput>
                    <Text style={styles.text}>Location</Text>
                    <TextInput style={styles.textInput} placeholder="Location:"
                        onChangeText={(location) => this.setState({ location: location })}></TextInput>
                    <Text style={styles.text}>RSVP Code</Text>
                    <TextInput style={styles.textInput} placeholder="RSVP Code:"
                        onChangeText={(rsvpCode) => this.setState({ rsvpCode: rsvpCode })}></TextInput>
                    <Text style={styles.text}>Co-hosts</Text>
                    <TextInput style={styles.textInput} placeholder="Co-hosts:"
                        onChangeText={(coHosts) => this.setState({ coHosts: coHosts })}></TextInput>

                    <Text style={styles.text}>Choose an Event Type</Text>
                    <PickerExample value={this.state.eventType}
                        onSelection={(eventType) => this.setState({ eventType: eventType })} />


                    <TouchableOpacity>
                        <Button
                            title="Create Event"
                            onPress={async () => {
                                this.state.eventId = await UuidGenerator.generateUuid();
                                this.props.navigation.push('ReviewEvents', { eventInfo: this.state })
                            }}
                        ></Button>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36485f',
        flexDirection: 'column',
        padding: 5,
    },
    space: {
        margin: 10,
    },
    error: {
        color: 'red',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    textDate: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        alignSelf: "center",
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: "center",
        padding: 20,
        backgroundColor: "#59cbbd",
        marginTop: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: "bold"
    },

});

export default CreateEventsScreen;