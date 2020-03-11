
const utils = require("../utils");

var courses = [
    {
        title: "Event Driven Cakes",
        cost: 50
    },
    {
        title: "Asynchronous Artichoke",
        cost: 25
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 10
    }
];

module.exports = {
    sendReqParam: (req, res) => { 
        utils.logReqData(req);
        let veg = req.params.vegetable;
        res.send(`This is the page for ${veg}`);
    },

    respondWithName: (req, res) => {
        utils.logReqData(req);
        let paramsName = req.params.myName;
        res.render("index", {name: paramsName});
    },

    showHome: (req, res) => {
        utils.logReqData(req);
        res.render("index");
    },

    showCourses: (req, res) => {
        utils.logReqData(req);
        res.render("courses", {offeredCourses: courses});
    },

    showSignUp: (req, res) => {
        utils.logReqData(req);
        res.render("contact");
    },

    postedSighUpForm: (req, res) => {
        utils.logReqData(req);
        res.render("thanks");
    }
};
