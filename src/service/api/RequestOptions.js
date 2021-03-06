const { POST, PUT, GET, DELETE } = require("../../enums/RequestTypesEnum");
const MOCK_SERVICE_URL = require('../../enums/ApiConfigurationEnum').MOCK_SERVICE_URL;
import UuidGenerator from '../../util/UuidGenerator';

class RequestOptions {
    static async generateOptions(method, apiPath, data) {
        switch (method) {
            case POST:
                return {
                    method: POST,
                    url: MOCK_SERVICE_URL + apiPath,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data)
                }
            case PUT:
                return {
                    method: PUT,
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
                    data: undefined
                }
            case DELETE:
                return {
                    method: PUT,
                    url: MOCK_SERVICE_URL + apiPath,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data)
                }
            default:
                return {
                    method: '',
                    url: MOCK_SERVICE_URL + apiPath,
                    headers: {},
                    data: data
                }
        }
    }

    static async setUpRequestBody(collection, document, jobInfo) {
        return {
            collection: collection,
            document: document,
            data: jobInfo
        }
    }
}

module.exports = RequestOptions;
