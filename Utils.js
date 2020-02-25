"use strict";

const fs = require("fs"),
    httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes");

module.exports = {
    getJSONString: obj => {
        return JSON.stringify(obj, null, 2);
    },

    getFile: (file, res) => {
        console.log(`File path: ./${file}`)
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                res.end("There was an error serving content!");
                return;
            }
            res.end(data);
        });   
    }
};