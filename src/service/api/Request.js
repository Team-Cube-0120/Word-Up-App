const MOCK_SERVICE_URL = require('../../enums/ApiConfigurationEnum').MOCK_SERVICE_URL;

const request = async (method, apiPath, data) => {
    return new Promise(async (resolve, reject) => {
        getRequestOptions(method, data)
            .then((options) => fetch(MOCK_SERVICE_URL + apiPath, options))
            .then((response) => resolve(response.json()))
            .catch((error) => reject({ Status: 400, Message: "Error POST data: " + error }))
    });
}

module.exports = request;