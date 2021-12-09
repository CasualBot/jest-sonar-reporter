"use strict";
exports.__esModule = true;
var xmlIndent_1 = require("./xmlIndent");
describe('xmlIndent', function () {
    test('should generate spaces', function () {
        var indent = (0, xmlIndent_1["default"])(4);
        expect(indent).toMatchSnapshot();
    });
});
