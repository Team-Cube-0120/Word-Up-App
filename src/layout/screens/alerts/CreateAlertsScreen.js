 
import React, {useState, Component} from 'react';  
import {StyleSheet, Text, TextInput, Button, View, ScrollView ,SafeAreaView, TouchableOpacity} from 'react-native';
import { Card, Input } from 'react-native-elements';
import PickerExample from './PickerExample';


class CreateAlertsScreen extends Component {
    render() {
        return ( 
        <ScrollView style={styles.container}>
            <Card>
                <Card.Title>Create Alert</Card.Title>
                <Card.Divider />
                    <Text style = {styles.text}>Name</Text>
                    <TextInput style = {styles.textInput} placeholder = "Alert Name:"></TextInput>
                    <Text style = {styles.text}>Severity</Text>
                    <TextInput style = {styles.textInput} placeholder = "Severity:"></TextInput>
                    <Text style = {styles.text}>Details</Text>
                    <TextInput style = {styles.textInput} placeholder = "Details:"></TextInput>
                    <Text style = {styles.text}>Location</Text>
                    <TextInput style = {styles.textInput} placeholder = "Location:"></TextInput>
                    <Text style = {styles.text}>Choose an Alert Type</Text>
                    <PickerExample />

                <TouchableOpacity style = {styles.button}>
                    <Text style = {styles.btnText}>Create Alert</Text>
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
        fontFamily: 'sans-serif',
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

export default CreateAlertsScreen;


