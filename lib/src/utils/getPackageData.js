"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (root) => {
    return require(path.join(root, 'package.json'));
};
