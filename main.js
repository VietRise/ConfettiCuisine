"use strict";
const cities = require("cities");
const test = require("./test");
const utils = require("./utils");
const router = require("./router");
const contentType = require("./contentTypes")


// lesson 2
// let printNumber = arr => {
//   arr.forEach(num => console.log(num));
// }

// printNumber([1, 2, 3]);

// console.log("Test");
// console.log("Hello %s", "Universe");
// console.log("Score %d", 100);
// let x = "Viet";
// console.log(`Hello ban ${100}`);

// lesson 3
// var myCity = cities.zip_lookup("10016");
// console.log(myCity);

// console.log(`Result: ${test.addNum(3, 5)}`);

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
httpStatus = require("http-status-codes"),
fs = require("fs");

router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.html);
    utils.getFile("views/index.html", res);
});

router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.html);
    utils.getFile("views/courses.html", res);
});

router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.html);
    utils.getFile("views/contact.html", res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.html);
    utils.getFile("views/thanks.html", res);
});

router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.png);
    utils.getFile("publics/images/graph.png", res);
});

router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.jpg);
    utils.getFile("publics/images/people.jpg", res);
});

router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.jpg);
    utils.getFile("publics/images/product.jpg", res);
});

router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.css);
    utils.getFile("publics/css/confetti_cuisine.css", res);
});

router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.css);
    utils.getFile("publics/css/bootstrap.css", res);
});

router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.js);
    utils.getFile("publics/js/confettiCuisine.js", res);
});

const app = http.createServer();
app.on("request", (req, res) => {
    var body = [];
    req.on("data", (bodyData) => {
        console.log(`BodyData: ${utils.getJSONString(bodyData)}`);
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

    let responseMessage = Route.getRouteResponseMap(req.url);
    
    if (!responseMessage){
      responseMessage = "<h1>Welcom!.</h1>";  
    }
    
    res.end(responseMessage);
});

const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, router.htmlContentType);
    res.write("<h1>File not found!</h1>");
    res.end();
};

const customReadFile = (filePath, res) => {
    if(fs.existsSync(filePath)) {
        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res);
    }
};

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);





