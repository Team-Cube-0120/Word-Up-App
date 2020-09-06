import React, { useState, Component } from 'react';
import { View, Button, Platform, Text, Picker, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';


class DateandTime extends Component {
    static propTypes = {
        onStartDateSelection: PropTypes.func,
        onStartTimeSelection: PropTypes.func,
        onEndDateSelection: PropTypes.func,
        onEndTimeSelection: PropTypes.func,
    }


    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        alert(currentDate);
        
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    showDatepicker = () => {
        showMode('date');
    };

    showTimepicker = () => {
        showMode('time');
    };
    // const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Start Date:</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={this.showDatepicker}>
                        <Text style={styles.btnText}>Calender</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>Start Time:</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={this.showTimepicker}>
                        <Text style={styles.btnText}>Clock</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text></Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>End Date:</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={this.showDatepicker}>
                        <Text style={styles.btnText}>Calender</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>End Time:</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={this.showTimepicker}>
                        <Text style={styles.btnText}>Clock</Text>
                    </TouchableOpacity>
                </View>
                <View>

                </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 20,
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