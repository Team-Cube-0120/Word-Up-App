const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase/wordup-50b05-firebase-adminsdk-adpl1-8cc9071df5.json');

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
                .catch((err) => reject("Error posting data: " + err));
        });
    }

    async update(collection, document, data) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .doc(document)
                .update(data)
                .then(() => resolve("Data successfully updated"))
                .catch((err) => reject("Error updating data: " + err));
        });
    }

    async get(collection, document) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .doc(document)
                .get()
                .then((payload) => resolve(payload.data()))
                .catch((err) => reject("Error retrieving data: " + err));
        });
    }
}

module.exports = FirebaseFirestore;