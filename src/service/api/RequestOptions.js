const { POST, PUT, GET } = require("../../enums/RequestTypesEnum");
const MOCK_SERVICE_URL = require('../../enums/ApiConfigurationEnum').MOCK_SERVICE_URL;


const getRequestOptions = async (method, apiPath, data) => {
    switch (method) {
        case (POST || PUT):
            return {
                method: POST,
                url: MOCK_SERVICE_URL + apiPath,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }
        case GET:
            return {
                method: method,
                url: MOCK_SERVICE_URL + apiPath,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: raw
            }
        default: 
            return {
                method: '',
                url: MOCK_SERVICE_URL + apiPath,
                headers: {},
                data: raw
            }
    }
}

module.exports = getRequestOptions;