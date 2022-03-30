import Snapshot from './snapshot';
import TestResults from './test-results';

export default interface Results {
  numFailedTestSuites: number;
  numFailedTests: number;
  numPassedTestSuites: number;
  numPassedTests: number;
  numPendingTestSuites: number;
  numPendingTests: number;
  numRuntimeErrorTestSuites: number;
  numTodoTests: number;
  numTotalTestSuites: number;
  numTotalTests: number;
  openHandles: Array<unknown>;
  snapshot: Snapshot;
  startTime: Date;
  success: boolean;
  testResults: Array<TestResults>;
  wasInterrupted: boolean;
}
