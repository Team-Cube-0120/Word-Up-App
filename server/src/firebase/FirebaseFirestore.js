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
            this.database
                .collection(collection)
                .doc(document)
                .set(data)
                .then(() => resolve("Data successfully posted"))
                .catch((error) => reject("Error posting data: " + error));
        });
    }

    async update(collection, document, data) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .doc(document)
                .update(data)
                .then(() => resolve("Data successfully updated"))
                .catch((error) => reject("Error updating data: " + error));
        });
    }

    async get(collection, document) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .doc(document)
                .get()
                .then((payload) => (payload.exists) ? resolve(payload.data()) : reject("Data does not exist in database"))
                .catch((error) => reject("Error retrieving data: " + error));
        });
    }

    async delete(collection, document, data) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .doc(document)
                .delete()
                .then(() => resolve("Data Deleted Succesfully"))
                .catch((error) => reject("Error deleting document: " + error));
        });
    }

    async getAll(collection) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .get()
                .then((payload) => {
                    let data = [];
                    payload.forEach((doc) => {
                        data.push(doc.data());
                    })
                    resolve(data);
                })
                .catch((error) => reject("Error retrieving data: " + error));
        })
    }
}

module.exports = FirebaseFirestore;