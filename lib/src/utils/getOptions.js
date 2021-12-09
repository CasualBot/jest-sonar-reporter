"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const replaceRootDirInPath_1 = require("./replaceRootDirInPath");
function getEnvOptions() {
    const options = {};
    for (let name in constants_1.default.ENV_CONFIG_MAP) {
        if (process.env[name]) {
            options[constants_1.default.ENV_CONFIG_MAP[name]] = process.env[name];
        }
    }
    return options;
}
function getAppOptions(pathToResolve) {
    let traversing = true;
    while (traversing) {
        traversing = pathToResolve !== path.sep;
        const pkgpath = path.join(pathToResolve, 'package.json');
        if (fs.existsSync(pkgpath)) {
            let options = (require(pkgpath) || {})['jest-sonar-reporter'];
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
    return `jest-sonar-reporter-${(0, uuid_1.v1)()}.xml`;
}
module.exports = {
    options: (reporterOptions = {}) => {
        return Object.assign({}, constants_1.default.DEFAULT_OPTIONS, reporterOptions, getAppOptions(process.cwd()), getEnvOptions());
    },
    getAppOptions: getAppOptions,
    getEnvOptions: getEnvOptions,
    replaceRootDirInOutput: replaceRootDirInOutput,
    getUniqueOutputName: getUniqueOutputName
};
