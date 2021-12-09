"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCase = void 0;
var failure_1 = require("./failure");
var testCase = function (testResult) {
    var failures;
    var aTestCase = {
        _attr: {
            name: testResult.fullName || testResult.title,
            duration: testResult.duration || 0
        }
    };
    if (testResult.status === 'failed') {
        failures = testResult.failureMessages.map(failure_1.failure);
        return { testCase: [aTestCase].concat(failures) };
    }
    return { testCase: aTestCase };
};
exports.testCase = testCase;
