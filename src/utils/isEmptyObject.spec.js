"use strict";
exports.__esModule = true;
var isEmptyObject_1 = require("./isEmptyObject");
describe('isEmptyObject', function () {
    test('empty object', function () {
        expect.assertions(1);
        var obj = {};
        expect((0, isEmptyObject_1["default"])(obj)).toBe(true);
    });
    test('non empty object', function () {
        expect.assertions(1);
        var obj = { foo: 'FOO' };
        expect((0, isEmptyObject_1["default"])(obj)).toBe(false);
    });
});
