"use strict";
exports.__esModule = true;
exports.file = void 0;
var testCase_1 = require("./testCase");
var file = function (testResult) {
    //TODO: Make path relative or absolute based on config
    var aFile = [{ _attr: { path: testResult.testFilePath } }];
    var testCases = testResult.testResults.map(testCase_1.testCase);
    return { file: aFile.concat(testCases) };
};
exports.file = file;
