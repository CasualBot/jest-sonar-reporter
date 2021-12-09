"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExecutions = void 0;
const file_1 = require("./file");
const testExecutions = (data, formatForSonar56 = false) => {
    const aTestExecution = [{ _attr: { version: '1' } }];
    const testResults = data.testResults.map(file_1.file);
    return formatForSonar56
        ? { unitTest: aTestExecution.concat(testResults) }
        : { testExecutions: aTestExecution.concat(testResults) };
};
exports.testExecutions = testExecutions;
