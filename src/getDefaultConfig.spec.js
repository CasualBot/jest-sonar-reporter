"use strict";
exports.__esModule = true;
var getDefaultConfig_1 = require("./getDefaultConfig");
describe('getDefaultConfig', function () {
    test('should retrieve default configuration', function () {
        expect.assertions(1);
        var root = '/';
        var defaultConfig = (0, getDefaultConfig_1.getDefaultConfig)(root);
        expect(defaultConfig).toMatchSnapshot();
    });
});
