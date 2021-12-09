"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copied from https://raw.githubusercontent.com/jest-community/jest-junit/master/utils/getOptions.js
var path = require("path");
var fs = require("fs");
var uuid_1 = require("uuid");
var constants_1 = require("../constants");
var replaceRootDirInPath_1 = require("./replaceRootDirInPath");
function getEnvOptions() {
    var options = {};
    for (var name in constants_1.default.ENV_CONFIG_MAP) {
        if (process.env[name]) {
            options[constants_1.default.ENV_CONFIG_MAP[name]] = process.env[name];
        }
    }
    return options;
}
function getAppOptions(pathToResolve) {
    var traversing = true;
    // Find nearest package.json by traversing up directories until /
    while (traversing) {
        traversing = pathToResolve !== path.sep;
        var pkgpath = path.join(pathToResolve, 'package.json');
        if (fs.existsSync(pkgpath)) {
            var options = (require(pkgpath) || {})['jest-sonar-reporter'];
            if (Object.prototype.toString.call(options) !== '[object Object]') {
                options = {};
            }
            return options;
        }
        else {
            pathToResolve = path.dirname(pathToResolve);
        }
    }
    return {};
}
function replaceRootDirInOutput(rootDir, output) {
    return rootDir !== null ? (0, replaceRootDirInPath_1.replaceRootDirInPath)(rootDir, output) : output;
}
function getUniqueOutputName() {
    return "jest-sonar-reporter-".concat((0, uuid_1.v1)(), ".xml");
}
module.exports = {
    options: function (reporterOptions) {
        if (reporterOptions === void 0) { reporterOptions = {}; }
        return Object.assign({}, constants_1.default.DEFAULT_OPTIONS, reporterOptions, getAppOptions(process.cwd()), getEnvOptions());
    },
    getAppOptions: getAppOptions,
    getEnvOptions: getEnvOptions,
    replaceRootDirInOutput: replaceRootDirInOutput,
    getUniqueOutputName: getUniqueOutputName
};
