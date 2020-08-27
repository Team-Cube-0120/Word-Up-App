const express = require('express');
const app = express();

const PORT = 8000;

app.get('/test', (req, res) => {
    console.log("test api call");
})

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
})