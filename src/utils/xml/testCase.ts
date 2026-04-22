import { failure } from "./failure";
import type { TestCaseInput, XmlLeaf } from '../../types';

const SKIPPED_STATUSES = new Set(['pending', 'skipped', 'todo']);

export const testCase = (testResult: TestCaseInput): XmlLeaf => {
  const aTestCase = {
    _attr: {
      name: testResult.fullName || testResult.title,
      duration: testResult.duration || 0
    }
  }
  const head: XmlLeaf[] = [aTestCase];

  if (testResult.status === 'failed') {
    const failures = (testResult.failureMessages ?? []).map(failure);
    return { testCase: head.concat(failures) };
  }

  if (testResult.status && SKIPPED_STATUSES.has(testResult.status)) {
    return {
      testCase: head.concat({
        skipped: {
          _attr: {
            message: "Test skipped"
          },
        },
      }),
    };
  }

  return { testCase: aTestCase };
}
