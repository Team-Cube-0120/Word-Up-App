const { POST, PUT, GET } = require("../../enums/RequestTypesEnum");

const getRequestOptions = async (method, data) => {
    switch (method) {
        case (POST || PUT):
            return {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        case GET:
            return {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: raw
            }
        default: 
            return {
                method: '',
                headers: {},
                body: raw
            }
    }
}

module.exports = getRequestOptions;