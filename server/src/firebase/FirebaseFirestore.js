const { firestore } = require('firebase-admin');
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
            data.datePosted = new Date();
            this.database
                .collection(collection)
                .doc(document)
                .set(data)
                .then(() => resolve("Data successfully posted"))
                .catch((error) => reject("Error posting data: " + error));
        });
    }

    async postJob(collection, document, data) {
        return new Promise((resolve, reject) => {
            try {
                this.updateUserItemId(data.userId, { jobIds: firestore.FieldValue.arrayUnion(data.jobId) })
                    .then((response) => this.post(collection, document, data))
                    .then((response) => resolve(response))
                    .then((error) => reject(error))
            } catch (e) {
                reject(e);
            }
        });
    }

    async postEvent(collection, document, data) {
        return new Promise((resolve, reject) => {
            try {
                this.updateUserItemId(data.userId, { eventIds: firestore.FieldValue.arrayUnion(data.eventId) })
                    .then((response) => this.post(collection, document, data))
                    .then((response) => resolve(response))
                    .then((error) => reject(error))
            } catch (e) {
                reject(e);
            }
        });
    }

    async postSignedUpEvent(collection, document, data, userId) {
        return new Promise((resolve, reject) => {
            try {
                this.updateUserItemId(userId, { signedUpEvents: firestore.FieldValue.arrayUnion(data.eventId) })
                    .then((response) => resolve(response))
                    .then((error) => reject(error))
            } catch (e) {
                reject(e);
            }
        });
    }

    async postSignedUpUser(collection, document, data, userId) {
        return new Promise((resolve, reject) => {
            try {
                this.updateEventItemId(data.eventId, { signedUpUsers: firestore.FieldValue.arrayUnion(userId) })
                    .then((response) => resolve(response))
                    .then((error) => reject(error))
            } catch (e) {
                reject(e);
            }
        });
    }

    async unRegister(collection, document, data, userId) {
        return new Promise((resolve, reject) => {
            try {
                this.updateUserItemId(userId, { signedUpEvents: firestore.FieldValue.arrayRemove(data.eventId) })
                    .then((response) => resolve(response))
                    .then((error) => reject(error))
            } catch (e) {
                reject(e);
            }
        });
    }

    async unRegisterUser(collection, document, data, userId) {
        return new Promise((resolve, reject) => {
            try {
                this.updateEventItemId(data.eventId, { signedUpUsers: firestore.FieldValue.arrayRemove(userId) })
                    .then((response) => resolve(response))
                    .then((error) => reject(error))
            } catch (e) {
                reject(e);
            }
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

    async delete(collection, document) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .doc(document)
                .delete()
                .then(() => resolve("Data Deleted Succesfully"))
                .catch((error) => reject("Error deleting document: " + error));
        });
    }

    async deleteJob(collection, document, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.updateUserItemId(userId, { jobIds: firestore.FieldValue.arrayRemove(document) })
                    .then((response) => this.delete(collection, document))
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            } catch (e) {
                reject(e);
            }
        });
    }

    async deleteEvent(collection, document, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.updateUserItemId(userId, { eventIds: firestore.FieldValue.arrayRemove(document) })
                .then()
                    .then((response) => this.delete(collection, document))
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            } catch (e) {
                reject(e);
            }
        });
    }

    async deleteAlert(collection, document, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.updateUserItemId(userId, { alertIds: firestore.FieldValue.arrayRemove(document) })
                .then()
                    .then((response) => this.delete(collection, document))
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            } catch (e) {
                reject(e);
            }
        });
    }



    /**
     * updates the job, event, or alert id in the user account
     */
    async updateUserItemId(userId, updatedIdListObject) {
        return new Promise((resolve, reject) => {
            this.database
                .collection("users")
                .doc(userId)
                .update(updatedIdListObject)
                .then((response) => resolve("Data successfully updated"))
                .catch((error) => reject("Error updating document: " + error))
        })
    }

    async updateEventItemId(eventId, updatedIdListObject) {
        return new Promise((resolve, reject) => {
            this.database
                .collection("events")
                .doc(eventId)
                .update(updatedIdListObject)
                .then((response) => resolve("Data successfully updated"))
                .catch((error) => reject("Error updating document: " + error))
        })
    }

    async filterByOther(collection, filterOption) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .where('userId', '==', filterOption)
                .get()
                .then(payload => {
                    let data = [];
                    payload.forEach((doc) => {
                        data.push(doc.data());
                    })
                    resolve(data);
                })
                .catch((error) => reject("Error retrieving data: " + error));
        });
    }

    //TODO

    async filterBySigned(collection, filterOption) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection)
                .where('signedUpUsers', 'array-contains', filterOption)
                .get()
                .then(payload => {
                    let data = [];
                    payload.forEach((doc) => {
                        data.push(doc.data());
                    })
                    resolve(data);
                })
                .catch((error) => reject("Error retrieving data: " + error));
        });
    }

    async filterByDate(collection, filterOption) {
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

    async getFilteredAlerts(collection, filterOption) {
        return new Promise((resolve, reject) => {
            this.database
                .collection(collection).where('alertType', '==', filterOption)
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
                .orderBy('datePosted', 'desc')
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

    async getAllFeedback(collection) {
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
            // let currentDate = new Date(Date.now()).toLocaleString(); // YYY-MM-DD
            newComment.datePosted = new Date().getTime();
            let updateArgs = { comments: admin.firestore.FieldValue.arrayUnion(newComment) };
            this.update(collection, document, updateArgs)
                .then((message) => resolve(message))
                .catch((error) => reject(error));
        });
    }
}

module.exports = FirebaseFirestore;