 
import React, {useState} from 'react';  
import {StyleSheet, Text, TextInput, Button, View, Picker, ScrollView ,SafeAreaView, TouchableOpacity} from 'react-native';



const EventsScreen = props => {
    const [selectedValue, setSelectedValue] = useState("Default");
 return (  
    <ScrollView style={styles.container}>
        <Text style = {styles.header}>Create Event</Text>
        <TextInput style = {styles.textInput} placeholder = "Event Name:"></TextInput>
        <TextInput style = {styles.textInput} placeholder = "Details:"></TextInput>
        <TextInput style = {styles.textInput} placeholder = "Location:"></TextInput>
        <TextInput style = {styles.textInput} placeholder = "RSVP Code:"></TextInput>
        <TextInput style = {styles.textInput} placeholder = "Co-hosts:"></TextInput>

        <Text style = {styles.text}>Choose an Event Type</Text>
        <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
            <Picker.Item label="Meeting" value="Default" />
            <Picker.Item label="Outdoor" value="Outdoor" />
            <Picker.Item label="Party" value="Party" />
            <Picker.Item label="Food" value="Food" />
        </Picker>

        <TouchableOpacity style = {styles.button}>
            <Text style = {styles.btnText}>Create Event</Text>
        </TouchableOpacity>
        {/* <Button style = {styles.button} title="Create Event!" ></Button> */}
    </ScrollView>
    );  
}


const styles = StyleSheet.create({  
    container: {  
        flex: 1,
        backgroundColor: '#36485f',
        flexDirection: 'column',
        padding: 20,    
    },  
    space: {
        margin: 10, // adds margin of 10 on all sides (top, left, bottom, right)
    },
    error: {
        color: 'red', // makes text color red
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
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
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
    picker:{
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomWidth: 1,
    },
    text: {
        alignSelf: 'stretch',
        fontSize: 12,
        color: '#fff',
        paddingBottom: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
});  

export default EventsScreen;


