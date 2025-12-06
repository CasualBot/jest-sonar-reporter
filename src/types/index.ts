/**
 * Configuration options for the Jest Sonar Reporter
 */
export interface ReporterOptions {
  suiteName?: string;
  outputDirectory?: string;
  outputFile?: string;
  outputName?: string;
  uniqueOutputName?: boolean | string;
  classNameTemplate?: string | ((variables: TemplateVariables) => string);
  suiteNameTemplate?: string | ((variables: TemplateVariables) => string);
  titleTemplate?: string | ((variables: TemplateVariables) => string);
  ancestorSeparator?: string;
  usePathForSuiteName?: boolean | string;
  addFileAttribute?: boolean | string;
  includeConsoleOutput?: boolean | string;
  includeShortConsoleOutput?: boolean | string;
  reportTestSuiteErrors?: boolean | string;
  noStackTrace?: boolean | string;
  testSuitePropertiesFile?: string;
  relativePaths?: boolean;
  projectRoot?: string | null;
  formatForSonar56?: boolean;
}

export interface TemplateVariables {
  classname?: string;
  title?: string;
  filename?: string;
  filepath?: string;
  suitename?: string;
  displayName?: string;
}

export interface TestResult {
  ancestorTitles: string[];
  duration: number;
  failureMessages: string[];
  numPassingAsserts: number;
  status: 'passed' | 'failed' | 'pending' | 'todo' | 'error';
  title?: string;
  fullName?: string;
  pendingReason?: string;
}

export interface TestSuiteResult {
  testFilePath: string;
  testResults: TestResult[];
  failureMessage?: string;
  console?: any[];
}

export interface AggregatedResult {
  testResults: TestSuiteResult[];
  startTime: number;
}

export interface JestGlobalConfig {
  rootDir?: string;
  testResults?: TestSuiteResult[];
  hasOwnProperty: (prop: string) => boolean;
}
