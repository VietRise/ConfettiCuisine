const utils = require("./utils");
const homeController = require("./controllers/homeController");

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
.use(express.urlencoded({
    extended: false 
}))
.use(express.json())
.get("/items/:vegetable", homeController.sendReqParam)
.get("/name/:myName", homeController.respondWithName)
.post("/", (req, res) => {
    console.log(`params: ${utils.getJSONString(req.params)}`);
    console.log(`body: ${utils.getJSONString(req.body)}`);
    console.log(`url: ${utils.getJSONString(req.url)}`);
    console.log(`query: ${utils.getJSONString(req.query)}`);
    console.log(`method: ${utils.getJSONString(req.method)}`);
    res.send("Contact information submitted successfully.");
})
.post("/contact/:vegetable", (req, res) => {
    console.log(`params: ${utils.getJSONString(req.params)}`);
    console.log(`body: ${utils.getJSONString(req.body)}`);
    console.log(`url: ${utils.getJSONString(req.url)}`);
    console.log(`query: ${utils.getJSONString(req.query)}`);
    console.log(`method: ${utils.getJSONString(req.method)}`);
    res.send("Contact information submitted successfully.");
})
.listen(port, () => {
    console.log(`The Express.js server has started and is listening ➥ on port number: ${app.get("port")}`);
});