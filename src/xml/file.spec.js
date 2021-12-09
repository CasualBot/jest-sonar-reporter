"use strict";
exports.__esModule = true;
var xml = require("xml");
var file_1 = require("./file");
describe('file', function () {
    test('<file path=""></file>', function () {
        // Arrange
        var mock = {
            testFilePath: 'test/FooTest.js',
            testResults: []
        };
        // Act
        var actualReport = xml((0, file_1.file)(mock));
        // Assert
        expect(actualReport).toMatchSnapshot();
    });
    test('testCase tag', function () {
        // Arrange
        var mock = {
            testFilePath: 'test/FooTest.js',
            testResults: [
                { title: 'lorem ipsum' },
                { title: 'lorem ipsum' }
            ]
        };
        // Act
        var actualReport = xml((0, file_1.file)(mock), true);
        // Assert
        expect(actualReport).toMatchSnapshot();
    });
});
