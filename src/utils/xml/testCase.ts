import { failure } from './failure';
import type { TestResult } from '../../types';

/**
 * Builds an XML test case element from test result data
 * @param testResult The test result to convert
 * @returns XML structure for a test case element with optional failure/skipped nodes
 */
export const testCase = (testResult: TestResult): any => {
  const aTestCase = {
    _attr: {
      name: testResult.fullName ?? testResult.title,
      duration: testResult.duration ?? 0
    }
  };

  if (testResult.status === 'failed') {
    const failures = testResult.failureMessages.map(failure);
    return { testCase: [aTestCase, ...failures] as any };
  }

  if (testResult.status === 'pending') {
    return { testCase: [aTestCase, { skipped: {} }] as any };
  }

  return { testCase: aTestCase };
};
