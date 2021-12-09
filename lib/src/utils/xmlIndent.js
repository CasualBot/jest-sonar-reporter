"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (indent) => {
    let spaces = [];
    for (let i = 1; i <= indent; i += 1) {
        spaces.push(' ');
    }
    return spaces.join('');
};
