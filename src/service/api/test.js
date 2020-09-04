const ApiService = require('./ApiService');

ApiService.post('data/add', {
    collection: "jobs",
    document: "1",
    data: {
        position: "software",
        company: "google"
    }
})
    .then((response) => console.log("res: " + response))
    .catch((error) => console.log("err: " + JSON.stringify(error)));



//     var axios = require('axios');
// var data = JSON.stringify({"collection":"jobs","document":"1","data":{"position":"software","company":"google"}});

// var config = {
//   method: 'post',
//   url: 'http://localhost:8000/data/add',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// console.log(config);

// async function f() {
//     console.log("hi")
//     return ""
// }

// f()
// .then(() => axios(config))
// .then((response) => console.log(JSON.stringify(response.data)))
// .catch((error) => console.log(error));


