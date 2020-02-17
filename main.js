"use strict";
const cities = require("cities");
const test = require("./test");
const Utils = require("./Utils");
const Route = require("./Route");

// lesson 2
let printNumber = arr => {
  arr.forEach(num => console.log(num));
}

printNumber([1, 2, 3]);

console.log("Test");
console.log("Hello %s", "Universe");
console.log("Score %d", 100);
let x = "Viet";
console.log(`Hello ban ${100}`);

// lesson 3
var myCity = cities.zip_lookup("10016");
console.log(myCity);

console.log(`Result: ${test.addNum(3, 5)}`);

// lesson 4
// const port = 3000,
// http = require("http"),
// httpStatus = require("http-status-codes");

// const app = http.createServer((request, response) => {
//     console.log("Recieved an incoming request!");
//     response.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html"
//     });

//     let responseMessage = "<h1> Hello, Viet Dep Trai!</h1>";
//     response.write(responseMessage);
//     response.end();
//     console.log(`Send a response : ${responseMessage}`);
// });
// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

// lesson 5
const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes");

const app = http.createServer();
app.on("request", (req, res) => {
    var body = [];
    req.on("data", (bodyData) => {
        console.log(`BodyData: ${Utils.getJSONString(bodyData)}`);
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request body contents: ${body}`);
    });
    console.log(`Method: ${Utils.getJSONString(req.method)}`);
    console.log(`URL: ${Utils.getJSONString(req.url)}`);
    console.log(`Header: ${Utils.getJSONString(req.headers)}`);
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
    let responseMessage = "<h1>This will show on the screen.</h1>";
    res.end(responseMessage);
});
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);





