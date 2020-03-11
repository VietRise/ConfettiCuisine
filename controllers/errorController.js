const utils = require("../utils");
const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    utils.logError(error);
    next(error);
};

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
};

exports.internalServerError = (error, req, res, next) => {
    utils.logError(error);
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(error);
    res.send(`${errorCode} | Sorry, our application is experimencing a problem!`);
};

