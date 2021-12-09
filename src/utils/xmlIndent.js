"use strict";
exports.__esModule = true;
exports["default"] = (function (indent) {
    var spaces = [];
    for (var i = 1; i <= indent; i += 1) {
        spaces.push(' ');
    }
    return spaces.join('');
});
