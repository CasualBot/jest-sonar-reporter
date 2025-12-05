/**
 * Configuration constants for Jest Sonar Reporter
 */

export const ENV_CONFIG_MAP = {
  JEST_SUITE_NAME: 'suiteName',
  JEST_SONAR_OUTPUT_DIR: 'outputDirectory',
  JEST_SONAR_OUTPUT_NAME: 'outputName',
  JEST_SONAR_OUTPUT_FILE: 'outputFile',
  JEST_SONAR_UNIQUE_OUTPUT_NAME: 'uniqueOutputName',
  JEST_SONAR_CLASSNAME: 'classNameTemplate',
  JEST_SONAR_SUITE_NAME: 'suiteNameTemplate',
  JEST_SONAR_TITLE: 'titleTemplate',
  JEST_SONAR_ANCESTOR_SEPARATOR: 'ancestorSeparator',
  JEST_SONAR_ADD_FILE_ATTRIBUTE: 'addFileAttribute',
  JEST_SONAR_INCLUDE_CONSOLE_OUTPUT: 'includeConsoleOutput',
  JEST_SONAR_INCLUDE_SHORT_CONSOLE_OUTPUT: 'includeShortConsoleOutput',
  JEST_SONAR_REPORT_TEST_SUITE_ERRORS: 'reportTestSuiteErrors',
  JEST_SONAR_NO_STACK_TRACE: 'noStackTrace',
  JEST_USE_PATH_FOR_SUITE_NAME: 'usePathForSuiteName',
  JEST_SONAR_TEST_SUITE_PROPERTIES_JSON_FILE: 'testSuitePropertiesFile',
  JEST_SONAR_RELATIVE_PATHS: 'relativePaths',
  JEST_SONAR_PROJECT_ROOT: 'projectRoot',
  JEST_SONAR_56_FORMAT: 'formatForSonar56'
} as const;

export const DEFAULT_OPTIONS = {
  suiteName: 'jest tests',
  outputDirectory: process.cwd(),
  outputName: 'jest-sonar.xml',
  uniqueOutputName: false,
  classNameTemplate: '{classname} {title}',
  suiteNameTemplate: '{title}',
  titleTemplate: '{classname} {title}',
  ancestorSeparator: ' ',
  usePathForSuiteName: false,
  addFileAttribute: false,
  includeConsoleOutput: false,
  includeShortConsoleOutput: false,
  reportTestSuiteErrors: false,
  noStackTrace: false,
  testSuitePropertiesFile: 'jestSonarProperties.js',
  relativePaths: false,
  projectRoot: null,
  formatForSonar56: false
} as const;

/**
 * Template variable names
 */
export const SUITENAME_VAR = 'suitename' as const;
export const CLASSNAME_VAR = 'classname' as const;
export const FILENAME_VAR = 'filename' as const;
export const FILEPATH_VAR = 'filepath' as const;
export const TITLE_VAR = 'title' as const;
export const DISPLAY_NAME_VAR = 'displayName' as const;

// Default export for backward compatibility
export default {
  ENV_CONFIG_MAP,
  DEFAULT_OPTIONS,
  SUITENAME_VAR,
  CLASSNAME_VAR,
  FILENAME_VAR,
  FILEPATH_VAR,
  TITLE_VAR,
  DISPLAY_NAME_VAR
};
