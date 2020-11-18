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
            let currentDate = new Date().toISOString().slice(0, 10); // YYY-MM-DD
            data.datePosted = new Date(currentDate);
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

    async getFiltered(collection, filterOption) {
        return new Promise((resolve, reject) => {
            let filterOptionTime = new Date();
            let currentDate = new Date(Date.now());
            filterOptionTime.setDate(filterOptionTime.getDate() - filterOption);
            this.database
                .collection(collection)
                .where('datePosted', '>', filterOptionTime)
                .where('datePosted', '<', currentDate)
                .get()
                .then(payload => {
                    let data = []
                    payload.forEach((doc) => {
                        data.push(doc.data());
                    });
                    resolve(data);
                })
                .catch((error) => reject("Error retrieving data: " + error));
        });
    }

    async getFilteredEvents(collection, filterOption) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection).where('eventType', '==', filterOption)
                .get()
                .then(payload => {
                    let data = []
                    payload.forEach((doc) => {
                        data.push(doc.data());
                    });
                    resolve(data);
                })
                .catch((error) => reject("Error retrieving data: " + error));
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

    async getComments(collection, document) {
        return new Promise((resolve, reject) => {
            this.get(collection, document)
                .then((data) => resolve(data.comments))
                .catch((error) => reject(error));
        });
    }

    async addComment(collection, document, newComment) {
        return new Promise((resolve, reject) => {
            let currentDate = new Date(Date.now()).toLocaleString(); // YYY-MM-DD
            let dateList = currentDate.split(",");
            newComment.datePosted = dateList[1] + " on " + dateList[0]; 
            let updateArgs = { comments: admin.firestore.FieldValue.arrayUnion(newComment) };
            this.update(collection, document, updateArgs)
                .then((message) => resolve(message))
                .catch((error) => reject(error));
        });
    } 
}

module.exports = FirebaseFirestore;