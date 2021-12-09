"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRootDirInPath = void 0;
// Copied from https://github.com/facebook/jest/blob/master/packages/jest-config/src/utils.js
// in order to reduce incompatible jest dependencies
var path = require("path");
var replaceRootDirInPath = function (rootDir, filePath) {
    if (!/^<rootDir>/.test(filePath)) {
        return filePath;
    }
    return path.resolve(rootDir, path.normalize('./' + filePath.substr('<rootDir>'.length)));
};
exports.replaceRootDirInPath = replaceRootDirInPath;
