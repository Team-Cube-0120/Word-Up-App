const RequestOptions = require('./RequestOptions');
const axios = require('axios');

const request = async (method, apiPath, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            RequestOptions.generateOptions(method, apiPath, data)
                .then((options) => axios(options))
                .then((response) => {
                    if (response.data.Status == 200) {
                        resolve(response.data) 
                    } else {
                        reject(response.data);
                    }
                });
        } catch (error) {
            reject({ Status: 400, Message: "Error sending request: " + error })
        }
    });
}

module.exports = request;