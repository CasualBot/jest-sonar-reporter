"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (indent) {
    var spaces = [];
    for (var i = 1; i <= indent; i += 1) {
        spaces.push(' ');
    }
    return spaces.join('');
});
