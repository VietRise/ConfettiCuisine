const utils = require("./utils");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

const port = 3000,
    express = require("express"),
    app = express();

app
.set("port", process.env.PORT || 3000)
.set("view engine", "ejs")
.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
})
.use(express.static("public"))
.use(express.urlencoded({
    extended: false 
}))
.use(express.json())
.use(layouts)
.get("/items/:vegetable", homeController.sendReqParam)
.get("/name/:myName", homeController.respondWithName)
.get("/", (req, res) => {
    utils.logReqData(req);
    res.send("Contact information submitted successfully.");
})
.post("/", (req, res) => {
    utils.logReqData(req);
    res.send("Contact information submitted successfully.");
})
.post("/contact/:vegetable", (req, res) => {
    utils.logReqData(req);
    res.send("Contact information submitted successfully.");
})
.use(errorController.logErrors)
.use(errorController.respondNoResourceFound)
.use(errorController.respondInternalError)
.listen(port, () => {
    console.log(`The Express.js server has started and is listening ➥ on port number: ${app.get("port")}`);
});