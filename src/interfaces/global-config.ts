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
  changedSince: string;
  collectCoverage: boolean;
  collectCoverageFrom: Array<unknown>;
  collectCoverageOnlyFrom: string;
  coverageDirectory: string;
  coverageProvider: string;
  coverageReporters: Array<string>;
  coverageThreshold: CoverageThreshold;
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  errorOnDeprecated: boolean;
  expand: boolean;
  filter: string;
  findRelatedTests: boolean;
  forceExit: boolean;
  globalSetup: string;
  globalTeardown: string;
  json: boolean;
  lastCommit: boolean;
  listTests: boolean;
  logHeapUsage: boolean;
  maxConcurrency: number;
  maxWorkers: number;
  noSCM: string;
  noStackTrace: boolean;
  nonFlagArgs: Array<unknown>;
  notify: boolean;
  notifyMode: string;
  onlyChanged: boolean;
  onlyFailures: boolean;
  outputFile: string;
  passWithNoTests: boolean;
  projects: Array<unknown>;
  replname: string;
  reporters: object[] | (string | string[])[];
  rootDir: string;
  runTestsByPath: boolean;
  silent: string;
  skipFilter: boolean;
  snapshotFormat: string;
  testFailureExitCode: number;
  testNamePattern: string;
  testPathPattern: string;
  testResultsProcessor: string;
  testSequencer: string;
  testTimeout: string;
  updateSnapshot: string;
  useStderr: boolean;
  verbose: string;
  watch: boolean;
  watchAll: boolean;
  watchPlugins: string;
  watchman: boolean;
}
