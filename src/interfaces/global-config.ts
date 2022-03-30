export interface CoverageThreshold {
  global: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
}

export default interface GlobalConfiguration {
  bail: number;
  changedFilesWithAncestor: boolean;
  changedSince: undefined;
  collectCoverage: boolean;
  collectCoverageFrom: Array<unknown>;
  collectCoverageOnlyFrom: undefined;
  coverageDirectory: string;
  coverageProvider: string;
  coverageReporters: Array<string>;
  coverageThreshold: CoverageThreshold;
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  errorOnDeprecated: boolean;
  expand: boolean;
  filter: undefined;
  findRelatedTests: boolean;
  forceExit: boolean;
  globalSetup: undefined;
  globalTeardown: undefined;
  json: boolean;
  lastCommit: boolean;
  listTests: boolean;
  logHeapUsage: boolean;
  maxConcurrency: number;
  maxWorkers: number;
  noSCM: undefined;
  noStackTrace: boolean;
  nonFlagArgs: Array<unknown>;
  notify: boolean;
  notifyMode: 'failure-change';
  onlyChanged: boolean;
  onlyFailures: boolean;
  outputFile: undefined;
  passWithNoTests: boolean;
  projects: Array<unknown>;
  replname: undefined;
  reporters: [[string, object]];
  rootDir: string;
  runTestsByPath: boolean;
  silent: undefined;
  skipFilter: boolean;
  snapshotFormat: undefined;
  testFailureExitCode: number;
  testNamePattern: undefined;
  testPathPattern: string;
  testResultsProcessor: undefined;
  testSequencer: string;
  testTimeout: undefined;
  updateSnapshot: string;
  useStderr: boolean;
  verbose: undefined;
  watch: boolean;
  watchAll: boolean;
  watchPlugins: undefined;
  watchman: boolean;
}
