const { POST, PUT, GET } = require("../../enums/RequestTypesEnum");
const MOCK_SERVICE_URL = require('../../enums/ApiConfigurationEnum').MOCK_SERVICE_URL;
import UuidGenerator from '../../util/UuidGenerator';

class RequestOptions {
    static async generateOptions(method, apiPath, data) {
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
                    data: data
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
    
    static async setUpRequestBody(collection, jobInfo) {
        let document = await UuidGenerator.generateUuid();
        return {
            collection: collection,
            document: document,
            data: jobInfo
        }
    }
}

module.exports = RequestOptions;
