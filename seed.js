const mogoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const utils = require("./utils");

mogoose.connect("mongodb://localhost:27017/recipe_db", {useNewUrlParser: true});
const db = mogoose.connection;

var contacts = [
    {
        name: "Jon Wexler",
        email: "jon@jonwexler.com", 
        zipCode: 10016,
        courses: []
    }, 
    {
        name: "Chef Eggplant",
        email: "eggplant@recipeapp.com", 
        zipCode: 20331,
        courses: []
    }, 
    {
        name: "Professor Souffle", 
        email: "souffle@recipeapp.com", 
        zipCode: 19103,
        courses: []
    }
];

Subscriber.deleteMany()
    .exec()
    .then(() => {
        utils.logConsole("Subscriber data is empty!");
    });

var commands = [];

contacts.forEach(c => {
    commands.push(Subscriber.create(
        {
            name: c.name,
            email: c.email,
            zipCode: c.zipCode,
            courses: c.courses
        }
    ));
});

Promise.all(commands)
    .then(r => {
        utils.logConsoleObj(r);
        db.close();
    })
    .catch(error => {
        utils.logError(error);
    });