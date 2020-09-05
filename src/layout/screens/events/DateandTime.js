import React, {useState, Component } from 'react';
import { View, Button, Platform, Text, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';


const DateandTime = () => {
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
      
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
      
      const showDatepicker = () => {
        showMode('date');
      };
      
      const showTimepicker = () => {
        showMode('time');
      };
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style = {styles.text}>Start Date:</Text>
                    <TouchableOpacity style = {styles.button}
                                      onPress={showDatepicker}>
                        <Text style = {styles.btnText}>Calender</Text>
                    </TouchableOpacity>

                    <Text style = {styles.text}>Start Time:</Text>
                    <TouchableOpacity style = {styles.button}
                                      onPress={showTimepicker}>
                        <Text style = {styles.btnText}>Clock</Text>
                    </TouchableOpacity>
                </View>
                <View>  
                    <Text></Text>
                </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style = {styles.text}>End Date:</Text>
                        <TouchableOpacity style = {styles.button}
                                        onPress={showDatepicker}>
                            <Text style = {styles.btnText}>Calender</Text>
                        </TouchableOpacity>

                        <Text style = {styles.text}>End Time:</Text>
                        <TouchableOpacity style = {styles.button}
                                        onPress={showTimepicker}>
                            <Text style = {styles.btnText}>Clock</Text>
                        </TouchableOpacity>
                    </View>
                <View>
                   
                </View>
                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
                )}
          </View>
        )
    }

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft:20,
    },
    
    button: {
        padding: 5,
        alignItems: "center",
        backgroundColor: "#59cbbd",
    },
    btnText: {
        color: '#fff',
        fontWeight: "bold"
    },
});

export default DateandTime;