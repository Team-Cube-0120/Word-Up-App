 
import React, {useState} from 'react';  
import {StyleSheet, Text, TextInput, Button, View,Image,Dimensions} from 'react-native';

 const SettingsScreen = props => {
   
 return (  
        <View style={styles.container}>  
       
       <Text>Settings Screen </Text>
         
        </View>  
    );  
}


const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
         flexDirection: 'column',
        justifyContent: 'center',  
        alignItems: 'center'  
    },  


});  

export default SettingsScreen;


