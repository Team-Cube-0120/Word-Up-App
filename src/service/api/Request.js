const getRequestOptions = require('./RequestOptions');
const axios = require('axios');

const request = async (method, apiPath, data) => {
    return new Promise(async (resolve, reject) => {
        getRequestOptions(method, apiPath, data)
            .then((options) => axios(options))
            .then((response) => resolve(JSON.stringify(response.data)))
            .catch((error) => reject({ Status: 400, Message: "Error POST data: " + error }))
    });
}

module.exports = request;