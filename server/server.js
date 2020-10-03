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
    let data = req.body.data;
    firebaseFirestore.delete(collection, document, data)
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

app.get('/data/getAll', (req, res) => {
    let collection = req.query.collection;
    firebaseFirestore.getAll(collection)
        .then((data) => { res.send({ Status: 200, data: data }) })
        .catch((error) => { res.send({ Status: 400, Message: error }) })
})


app.listen(PORT, async () => {
    console.log("Server listening on port: " + PORT);
    await startService();
})
