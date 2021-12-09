"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCase = void 0;
const failure_1 = require("./failure");
const testCase = (testResult) => {
    let failures;
    const aTestCase = {
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
