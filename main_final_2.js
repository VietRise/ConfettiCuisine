const utils = require("./utils");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

// PORT
const port = 3000;

// Instantiate the express application
const express = require("express"),
    app = express();

// Set litenning port
app.set("port", process.env.PORT || port);

// Set up application to use ejs
app.set("view engine", "ejs");

// Preprocess
app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

// Set public folder
app.use(express.static("public"));

// Using body-parser for processing URL-encoded and JSON parameters
app.use(express.urlencoded({
    extended: false 
}));
app.use(express.json());

// Set up application to use the layout module
app.use(layouts);

// Handle GET request
app.get("/items/:vegetable", homeController.sendReqParam)
.get("/name/:myName", homeController.respondWithName)
.get("/", homeController.showHome)
.get("/courses", homeController.showCourses)
.get("/contact", homeController.showSignUp)

// Handle POST request
.post("/", (req, res) => {
    utils.logReqData(req);
    res.send("Contact information submitted successfully.");
})
.post("/contact/:vegetable", (req, res) => {
    utils.logReqData(req);
    res.send("Contact information submitted successfully.");
})
.post("/contact", homeController.postedSighUpForm)

// Handle ERROR request
.use(errorController.logErrors)
.use(errorController.pageNotFoundError)
.use(errorController.internalServerError);

// Express application listen on this port 
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening ➥ on port number: ${app.get("port")}`);
});