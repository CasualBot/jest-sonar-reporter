"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const testCase_1 = require("./testCase");
const file = (testResult) => {
    const aFile = [{ _attr: { path: testResult.testFilePath } }];
    const testCases = testResult.testResults.map(testCase_1.testCase);
    return { file: aFile.concat(testCases) };
};
exports.file = file;
