/**
 * WordUP backend service
 * @author Gurnoor Singh, Sunny Maddineni, Naim Kabir, Roshan Siwakoti, Pavan Seshadri
 */

// module dependencies
const express = require('express');

// object dependencies
const FirebaseFirestore = require('./src/firebase/FirebaseFirestore');

// server instances
var firebaseFirestore;
const app = express();
const PORT = 8000;
const startService = async () => {
    console.log("Starting service...");
    firebaseFirestore = new FirebaseFirestore();
    console.log("Service instances successfully initialized");
}

// express middleware
app.use(express.json())

// express API definitions
app.post('/data/add', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let data = req.body.data;
    firebaseFirestore.post(collection, document, data)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.post('/data/jobs/add', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let data = req.body.data;
    firebaseFirestore.postJob(collection, document, data)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.post('/data/events/add', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let data = req.body.data;
    firebaseFirestore.postEvent(collection, document, data)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});
app.post('/data/signup/add', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let data = req.body.data;
    firebaseFirestore.postSignedUpEvent(collection, document, data)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});
app.post('/data/unregister/delete', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let data = req.body.data;
    firebaseFirestore.unRegister(collection, document, data)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.put('/data/update', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let data = req.body.data;
    firebaseFirestore.update(collection, document, data)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.put('/data/delete', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    firebaseFirestore.delete(collection, document)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.put('/data/jobs/delete', (req, res) => {
    let collection = req.query.collection;
    let document = req.query.document;
    let userId = req.query.userId;
    firebaseFirestore.deleteJob(collection, document, userId)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.put('/data/events/delete', (req, res) => {
    let collection = req.query.collection;
    let document = req.query.document;
    let userId = req.query.userId;
    firebaseFirestore.deleteEvent(collection, document, userId)
        .then((message) => { res.send({ Status: 200, Message: message }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.get('/data/get', (req, res) => {
    let collection = req.query.collection;
    let document = req.query.document;
    firebaseFirestore.get(collection, document)
        .then((data) => { res.send({ Status: 200, data: data }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.get('/data/filter/date/get', (req, res) => {
    let collection = req.query.collection;
    let filterType = req.query.filterType;
    let filterOption = req.query.filterOption
    firebaseFirestore.filterByDate(collection, filterOption)
        .then((data) => { res.send({ Status: 200, data: data }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.get('/data/filter/other/get', (req, res) => {
    let collection = req.query.collection;
    let filterType = req.query.filterType;
    let filterOption = req.query.filterOption
    firebaseFirestore.filterByOther(collection, filterOption)
        .then((data) => { res.send({ Status: 200, data: data }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.get('/data/filterEvents/get', (req, res) => {
    let collection = req.query.collection;
    let filterOption = req.query.filterOption
    firebaseFirestore.getFilteredEvents(collection, filterOption)
        .then((data) => { res.send({ Status: 200, data: data }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) });
});

app.get('/data/getAll', (req, res) => {
    let collection = req.query.collection;
    firebaseFirestore.getAll(collection)
        .then((data) => { res.send({ Status: 200, data: data }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) })
});

app.get('/data/comments/get', (req, res) => {
    let collection = req.query.collection;
    let document = req.query.document;
    firebaseFirestore.getComments(collection, document)
        .then((data) => res.send({ Status: 200, data: data }))
        .catch((error) => res.send({ Status: 400, Message: error }));
});

app.put('/data/comments/add', (req, res) => {
    let collection = req.body.collection;
    let document = req.body.document;
    let newComment = req.body.data;
    firebaseFirestore.addComment(collection, document, newComment)
        .then((message) => res.send({ Status: 200, Message: message }))
        .catch((error) => res.send({ Status: 400, Message: error }))
});


app.listen(PORT, async () => {
    console.log("Server listening on port: " + PORT);
    await startService();
})
