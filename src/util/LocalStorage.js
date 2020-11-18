import AsyncStorage from '@react-native-community/async-storage';
import { USERINFO } from '../enums/StorageKeysEnum';
import ApiService from '../service/api/ApiService';

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

/**
 * Calls the server to update the local storage whenever user is updated
 * @param {} key 
 * @param {*} userId 
 */
let updateUserInfo = async (userId) => {
    return new Promise((resolve, reject) => {
        ApiService.get('data/get?collection=users&document=' + userId)
            .then((user) => storeData(USERINFO, user))
            .then(() => resolve("Updated User"))
            .catch((error) => reject("Error updating user: " + error));
    })
}

exports.storeData = storeData;
exports.getData = getData;
exports.updateUserInfo = updateUserInfo;