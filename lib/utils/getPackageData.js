"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
exports.default = (function (root) {
    return require(path.join(root, 'package.json'));
});
