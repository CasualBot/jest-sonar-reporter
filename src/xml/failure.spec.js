"use strict";
exports.__esModule = true;
var xml = require("xml");
var failure_1 = require("./failure");
describe('failure', function () {
    test('<failure message=""></failure>', function () {
        //Arrange
        var actualReport = xml((0, failure_1.failure)('Lorem ispum'));
        // Act
        // Assert
        expect(actualReport).toMatchSnapshot();
    });
});
