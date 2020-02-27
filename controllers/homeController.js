
const utils = require("../utils");

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
    }
};
