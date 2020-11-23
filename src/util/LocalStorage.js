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

let clearUserAccount = async (key) => {
    try {
        await storeData(USERINFO, {});
    } catch (error) {
        console.log("error clearing user data: " + error);
    }
}

/**
 * Calls the server to update the local storage whenever user is updated
 * @param {} key 
 * @param {*} userId 
 */
let updateUserInfo = async () => {
    return new Promise(async (resolve, reject) => {
        let userInfo = await getData(USERINFO);
        ApiService.get('data/get?collection=users&document=' + userInfo.id)
            .then((user) => storeData(USERINFO, user))
            .then(() => resolve("Updated User"))
            .catch((error) => reject("Error updating user: " + error));
    })
}


exports.storeData = storeData;
exports.getData = getData;
exports.updateUserInfo = updateUserInfo;
exports.clearUserAccount = clearUserAccount;