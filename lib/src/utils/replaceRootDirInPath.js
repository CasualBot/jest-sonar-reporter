"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRootDirInPath = void 0;
const path = require("path");
const replaceRootDirInPath = (rootDir, filePath) => {
    if (!/^<rootDir>/.test(filePath)) {
        return filePath;
    }
    return path.resolve(rootDir, path.normalize('./' + filePath.substr('<rootDir>'.length)));
};
exports.replaceRootDirInPath = replaceRootDirInPath;
