const RequestOptions = require('./RequestOptions');
const axios = require('axios');

const request = async (method, apiPath, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            RequestOptions.generateOptions(method, apiPath, data)
                .then((options) => axios(options))
                .then((response) => {
                    if (response.data.Status == 200) {
                        resolve(JSON.stringify(response.data)) 
                    } else {
                        reject(JSON.stringify(response.data));
                    }
                });
        } catch (error) {
            reject({ Status: 400, Message: "Error POST data: " + error })
        }
    });
}

module.exports = request;