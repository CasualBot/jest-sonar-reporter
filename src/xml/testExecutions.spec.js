"use strict";
exports.__esModule = true;
var xml = require("xml");
var testExecutions_1 = require("./testExecutions");
describe('testExecutions', function () {
    test('root: <testExecutions version="1"> when not formatted for sonar 5.6.x', function () {
        var mock = { testResults: [] };
        var actualReport = xml((0, testExecutions_1.testExecutions)(mock, false));
        expect(actualReport).toMatchSnapshot();
    });
    test('root: <unitTest version="1"> when formatted for sonar 5.6.x', function () {
        var mock = { testResults: [] };
        var actualReport = xml((0, testExecutions_1.testExecutions)(mock, true));
        expect(actualReport).toMatchSnapshot();
    });
    test('file tag', function () {
        var mock = {
            testResults: [
                {
                    testFilePath: 'test/FooTest.js',
                    testResults: []
                },
                {
                    testFilePath: 'test/BarTest.js',
                    testResults: []
                }
            ]
        };
        var actualReport = xml((0, testExecutions_1.testExecutions)(mock), true);
        expect(actualReport).toMatchSnapshot();
    });
    test('full report', function () {
        var mock = {
            testResults: [
                {
                    testFilePath: 'test/FooTest.js',
                    testResults: [
                        {
                            duration: 5,
                            fullName: 'lorem ipsum'
                        }
                    ]
                },
                {
                    testFilePath: 'test/BarTest.js',
                    testResults: [
                        {
                            duration: 5,
                            failureMessages: ['Lorem ipsum'],
                            fullName: 'lorem ipsum',
                            status: 'failed'
                        }
                    ]
                }
            ]
        };
        var actualReport = xml((0, testExecutions_1.testExecutions)(mock), true);
        expect(actualReport).toMatchSnapshot();
    });
});
