const routeResponseMap = {
    "/": "views/index.html",
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};

function getRouteResponseMap(key) {
    return routeResponseMap[key];
}

const httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils");

const routes = {
    "GET": {
        "/test": (req, res) => {
            res.writeHead(httpStatus.OK, contentTypes.html);
            res.end("Welcom to the Test Page");
        }
    },
    "POST": {}
}

exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, contentTypes.html);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        console.log("error" + ex);
    }
};

exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};