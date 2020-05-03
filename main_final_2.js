const utils = require("./utils");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const User = require("./models/user");

/*
// Mongodb
const MongoDB = require("mongodb").MongoClient,
    dbURL = "mongodb://localhost:27017",
    dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    // Printf data in contacts collection
    db.collection("contacts")
    .find()
    .toArray((error, data) => {
        if (error) throw error;
        console.log(data);
    });
    // Insert data into contacts collection
    db.collection("contacts")
    .insertOne({name: "Vijay", email: "vietrise@gmail.com"}, (error, db) => {
        if (error) throw error;
        console.log(db);
    });
});
*/

// Mongoose 
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/recipe_db", {useNewUrlParser: true});
const db = mongoose.connection;
/*
// Method 1 of instantiating new object
var subscriber1 = new Subscriber({
    name: "VietRise",
    email: "vietrise@gmail.com",
    zipCode: 2222
});
subscriber1.save((error, savedDocument) => {
    if (error) utils.logConsole(`Error ${error}`);
    utils.logConsole("Save successful");
    utils.logConsole(savedDocument);
});
// Method 2 of instantiating new object
Subscriber.create(
    {
        name: "VietRise1",
        email: "vietrise1@gmail.com",
        zipCode: 11111
    },
    function (error, savedDocument) {
        if (error) utils.logConsole(`Error: ${error}`);
        utils.logConsole("Save successful");
        utils.logConsole(savedDocument);
    }
)
*/
db.once("open", () => {
    utils.logConsole("Successfully connected to MongoDB using Mongoose!");
});

// Query data from mongodb
/*
let myQuery = Subscriber.findOne({name: "VietRise1"}).where("email", /viet/);
myQuery.exec((error, data) => {
    if (data) {
        utils.logConsole("Query data:");
        utils.logConsoleObj(data);
    }
});
*/
// PORT
const port = 3000;

// Instantiate the express application
const express = require("express"),
    app = express();

// Router
const router = require("./routes/index");

// Set litenning port
app.set("port", process.env.PORT || port);

// Set up application to use ejs
app.set("view engine", "ejs");

// Set token
app.set("token", process.env.TOKEN || "recipeT0k3n");

// Preprocess
app.use((req, res, next) => {
    utils.logReqData(req);
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

// Set up method-override to interpret the request as GET, POST, PUT or DELETE
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

// Set up express application to use cookie-parser as middleware
app.use(cookieParser("secretCuisine123"));

// Set up express session to use cooke-parser
app.use(expressSession({
    secret: "secretCuisine123",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Set up the login strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up validator
app.use(expressValidator());

// Set up application to use connect-flash as middlware
app.use(connectFlash());
app.use((req, res, next) => {
    utils.logConsole("FlashMessage");
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    utils.logConsoleObj(utils.getJSONString(res.locals));
    next();
})

// Set up router
app.use("/", router);

// Express application listen on this port 
app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening on port number: ${app.get("port")}`);
});