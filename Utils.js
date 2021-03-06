"use strict";

const fs = require("fs"),
    httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes");

module.exports = {
    getJSONString: function(obj) {
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
    },

    logConsole: function(data) {
        console.log(data);
    },

    logConsoleObj: function(obj) {
        console.log(this.getJSONString(obj));
    },

    logReqData: function(req) {
        console.log("Req Data ----------------------------------");
        console.log(`params: ${this.getJSONString(req.params)}`);
        console.log(`body: ${this.getJSONString(req.body)}`);
        console.log(`url: ${this.getJSONString(req.url)}`);
        console.log(`query: ${this.getJSONString(req.query)}`);
        console.log(`method: ${this.getJSONString(req.method)}`);   
    },

    logError: function(error) {
        console.log("Error -------------------------------------");
        console.error(error.stack);
    }
};