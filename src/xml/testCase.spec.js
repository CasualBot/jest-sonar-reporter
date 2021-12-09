"use strict";
exports.__esModule = true;
var xml = require("xml");
var testCase_1 = require("./testCase");
describe('testCase', function () {
    test('<testCase name="" duration=""/>', function () {
        // Arrange
        var mock = {
            duration: 5,
            fullName: 'lorem ipsum'
        };
        // Act
        var actualReport = xml((0, testCase_1.testCase)(mock));
        // Assert
        expect(actualReport).toMatchSnapshot();
    });
    test('failing test case', function () {
        // Arrange
        var mock = {
            failureMessages: ['Lorem ipsum'],
            status: 'failed',
            title: 'lorem ipsum'
        };
        // Act
        var actualReport = xml((0, testCase_1.testCase)(mock), true);
        // Assert
        expect(actualReport).toMatchSnapshot();
    });
});
