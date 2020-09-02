const RequestOptions = require('./RequestOptions');
const ApiService = require('./ApiService');

RequestOptions.setUpRequestBody("jobs", {data: "hi"})
    .then((body) => ApiService.post('data/add', body)
    .then((response) => console.log(response)));


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


