"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExecutions = void 0;
var file_1 = require("./file");
var testExecutions = function (data, formatForSonar56) {
    if (formatForSonar56 === void 0) { formatForSonar56 = false; }
    var aTestExecution = [{ _attr: { version: '1' } }];
    var testResults = data.testResults.map(file_1.file);
    return formatForSonar56
        ? { unitTest: aTestExecution.concat(testResults) }
        : { testExecutions: aTestExecution.concat(testResults) };
};
exports.testExecutions = testExecutions;
