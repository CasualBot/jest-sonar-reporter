export default interface TestResults {
  leaks: boolean;
  numFailingTests: number;
  numPassingTests: number;
  numPendingTests: number;
  numTodoTests: number;
  openHandles: Array<unknown>;
  perfStats: Array<object>;
  skipped: boolean;
  snapshot: Array<unknown>;
  testFilePath: string;
  testResults: Array<Array<unknown>>;
  failureMessage: null;
  coverage: undefined;
  console: undefined;
}
