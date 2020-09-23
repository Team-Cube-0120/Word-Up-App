import AsyncStorage from '@react-native-community/async-storage';

let storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log("Error storing value: " + error);
    }
}

let getData = async (key) => {
    try {
        let data = await AsyncStorage.getItem(key);
        if (data !== null)
            return JSON.parse(data)
        else 
            return null;
    } catch (error) {
        console.log("Error getting value: " + error);
    }
}

exports.storeData = storeData;
exports.getData = getData;