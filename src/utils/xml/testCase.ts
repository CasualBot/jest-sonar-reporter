import { failure } from "./failure";

export const testCase = (testResult: any): any => {
  let failures;
  const aTestCase = {
    _attr: {
      name: testResult.fullName || testResult.title,
      duration: testResult.duration || 0
    }
  }

  if (testResult.status === 'failed') {
    failures = testResult.failureMessages.map(failure)
    return {testCase: [aTestCase].concat(failures)}
  } else if (testResult.status === 'pending') {
    return {testCase: [aTestCase].concat({ skipped: {} } as any)};
  }
  return {testCase: aTestCase}
}
