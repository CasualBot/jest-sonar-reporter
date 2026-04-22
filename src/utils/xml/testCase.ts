import { failure } from "./failure";
import type { TestCaseInput, XmlLeaf } from '../../types';

export const testCase = (testResult: TestCaseInput): XmlLeaf => {
  let failures;
  const aTestCase = {
    _attr: {
      name: testResult.fullName || testResult.title,
      duration: testResult.duration || 0
    }
  }

  if (testResult.status === 'failed') {
    failures = (testResult.failureMessages ?? []).map(failure)
    return {testCase: [aTestCase as XmlLeaf].concat(failures)}
  } else if (testResult.status === 'pending' || testResult.status === 'skipped' || testResult.status === 'todo') {
    return {
      testCase: [aTestCase as XmlLeaf].concat({
        skipped: {
          _attr: {
            message: "Test skipped"
          },
        },
      }),
    };
  }
  return {testCase: aTestCase}
}
