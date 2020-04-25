const utils = require("../utils");
const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    utils.logError(error);
    next(error);
};

exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => {
    utils.logConsole(`ERROR occurred: ${error.stack}`);
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experimencing a problem!`);
};

