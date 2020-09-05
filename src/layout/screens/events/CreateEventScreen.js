 
import React, {useState, Component} from 'react';  
import {StyleSheet, Text, TextInput, Button, View, ScrollView ,SafeAreaView, TouchableOpacity} from 'react-native';
import { Card, Input } from 'react-native-elements';
import PickerExample from './PickerExample';
import DateandTime from './DateandTime';


class CreateEventsScreen extends Component {
    render() {
        return ( 
        <ScrollView style={styles.container}>
            <Card>
                <Card.Title>Create Event</Card.Title>
                <Card.Divider />
                    <Text style = {styles.text}>Position</Text>
                    <TextInput style = {styles.textInput} placeholder = "Event Name:"></TextInput>
                    <DateandTime />
                    <View>  
                        <Text></Text>
                    </View>
                    <Text style = {styles.text}>Details</Text>
                    <TextInput style = {styles.textInput} placeholder = "Details:"></TextInput>
                    <Text style = {styles.text}>Location</Text>
                    <TextInput style = {styles.textInput} placeholder = "Location:"></TextInput>
                    <Text style = {styles.text}>RSVP Code</Text>
                    <TextInput style = {styles.textInput} placeholder = "RSVP Code:"></TextInput>
                    <Text style = {styles.text}>Co-hosts</Text>
                    <TextInput style = {styles.textInput} placeholder = "Co-hosts:"></TextInput>
               
                    <Text style = {styles.text}>Choose an Event Type</Text>
                    <PickerExample />
                    
                    
                <TouchableOpacity style = {styles.button}>
                    <Text style = {styles.btnText}>Create Event</Text>
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
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom:20,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        alignSelf: "center",
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#59cbbd',
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


