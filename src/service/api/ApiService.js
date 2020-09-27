const request = require('./Request');
const { POST, PUT, GET, DELETE } = require('../../enums/RequestTypesEnum');

class ApiService {

    static async post(apiPath, data) {
        return new Promise((resolve, reject) => {
            request(POST, apiPath, data)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }

    static async update(apiPath, data) {
        return new Promise((resolve, reject) => {
            request(PUT, apiPath, data)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }
    static async delete(apiPath, data) {
        return new Promise((resolve, reject) => {
            request(DELETE, apiPath, data)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }

    static async get(apiPath, data = {}) {
        return new Promise((resolve, reject) => {
            request(GET, apiPath, data)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }
}

module.exports = ApiService;