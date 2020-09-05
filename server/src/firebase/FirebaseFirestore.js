const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase/service-account-credentials.json');

class FirebaseFirestore {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.database = admin.firestore();
    }

    async post(collection, document, data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.database
                    .collection(collection)
                    .doc(document)
                    .set(data)
                    .then(() => resolve("Data successfully posted"));
            } catch (error) {
                reject("Error posting data: " + error);
            }
        });
    }

    async update(collection, document, data) {
        return new Promise((resolve, reject) => {
            try {
                this.database
                    .collection(collection)
                    .doc(document)
                    .update(data)
                    .then(() => resolve("Data successfully updated"));
            } catch (error) {
                reject("Error updating data: " + error)
            }
        });
    }

    async get(collection, document) {
        return new Promise((resolve, reject) => {
            try {
                this.database
                    .collection(collection)
                    .doc(document)
                    .get()
                    .then((payload) => resolve(payload.data()));
            } catch (error) {
                reject("Error retrieving data: " + error)
            }
        });
    }
}

module.exports = FirebaseFirestore;