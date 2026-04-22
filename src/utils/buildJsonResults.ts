// Copied from https://raw.githubusercontent.com/jest-community/jest-junit/master/utils/buildJsonResults.js
import { stripVTControlCharacters as stripAnsi } from 'util';
import type { AggregatedResult, AssertionResult, TestResult } from '@jest/test-result';
import type { LogEntry } from '@jest/console';
import constants from '../constants';
import * as path from 'path';
import * as fs from 'fs';
import type { ReporterOptions, TemplateFunction, XmlLeaf } from '../types';

type SuiteNameVariables = Record<string, string>;

interface TestSuitesHeaderAttrs {
  name: string;
  tests: number;
  failures: number;
  errors: number;
  skipped: number;
  time: number;
}

interface TestSuitesRoot {
  testsuites: [{ _attr: TestSuitesHeaderAttrs }, ...XmlLeaf[]];
}

const toTemplateTag = function (varName: string): string {
  return "{" + varName + "}";
}

const replaceVars = function (strOrFunc: string | TemplateFunction, variables: SuiteNameVariables): string {
  if (typeof strOrFunc === 'string') {
    let str = strOrFunc;
    Object.keys(variables).forEach((varName) => {
      str = str.replace(toTemplateTag(varName), variables[varName]);
    });
    return str;
  } else {
    const func = strOrFunc;
    const resolvedStr = func(variables);
    if (typeof resolvedStr !== 'string') {
      throw new Error('Template function should return a string');
    }
    return resolvedStr;
  }
};

const executionTime = function (startTime: number, endTime: number): number {
  return (endTime - startTime) / 1000;
}

const addErrorTestResult = function (suite: TestResult): void {
  suite.testResults.push({
    ancestorTitles: [],
    duration: 0,
    failureMessages: [suite.failureMessage ?? ''],
    numPassingAsserts: 0,
    status: "error",
  } as unknown as AssertionResult);
}

type SuiteProperties = Record<string, string | TemplateFunction>;
type SuitePropertiesFactory = (suite: TestResult) => SuiteProperties;

export default (report: AggregatedResult, appDirectory: string, options: ReporterOptions): TestSuitesRoot => {
  const junitSuitePropertiesFilePath = path.join(process.cwd(), options.testSuitePropertiesFile);
  const ignoreSuitePropertiesCheck = !fs.existsSync(junitSuitePropertiesFilePath);

  // If the usePathForSuiteName option is true and the
  // suiteNameTemplate value is set to the default, overrides
  // the suiteNameTemplate.
  if (options.usePathForSuiteName === 'true' &&
      options.suiteNameTemplate === toTemplateTag(constants.TITLE_VAR)) {

    options.suiteNameTemplate = toTemplateTag(constants.FILEPATH_VAR);
  }

  // Generate a single XML file for all jest tests
  const jsonResults: TestSuitesRoot = {
    'testsuites': [{
      '_attr': {
        'name': options.suiteName,
        'tests': 0,
        'failures': 0,
        'errors': 0,
        'skipped': 0,
        // Overall execution time:
        // Since tests are typically executed in parallel this time can be significantly smaller
        // than the sum of the individual test suites
        'time': executionTime(report.startTime, Date.now())
      }
    }]
  };

  // Iterate through outer testResults (test suites)
  report.testResults.forEach((suite: TestResult) => {
    const noResults = suite.testResults.length === 0;
    if (noResults && (options.reportTestSuiteErrors as string) === 'false') {
      return;
    }

    const noResultOptions: Partial<ReporterOptions> = noResults ? {
      suiteNameTemplate: toTemplateTag(constants.FILEPATH_VAR),
      titleTemplate: toTemplateTag(constants.FILEPATH_VAR),
      classNameTemplate: `Test suite failed to run`
    } : {};

    const suiteOptions: ReporterOptions = Object.assign({}, options, noResultOptions);
    if (noResults) {
      addErrorTestResult(suite);
    }

    // Build variables for suite name
    const filepath = path.relative(appDirectory, suite.testFilePath);
    const filename = path.basename(filepath);
    const suiteTitle = suite.testResults[0].ancestorTitles[0];
    const displayName = typeof suite.displayName === 'object'
      ? suite.displayName.name
      : suite.displayName;

    // Build replacement map
    const suiteNameVariables: SuiteNameVariables = {};
    suiteNameVariables[constants.FILEPATH_VAR] = filepath;
    suiteNameVariables[constants.FILENAME_VAR] = filename;
    suiteNameVariables[constants.TITLE_VAR] = suiteTitle;
    suiteNameVariables[constants.DISPLAY_NAME_VAR] = displayName ?? '';

    // Add <testsuite /> properties
    const suiteNumTests = suite.numFailingTests + suite.numPassingTests + suite.numPendingTests;
    const suiteExecutionTime = executionTime(suite.perfStats.start, suite.perfStats.end);

    const suiteErrors = noResults ? 1 : 0;
    const testSuite: { testsuite: XmlLeaf[] } = {
      testsuite: [{
        _attr: {
          name: replaceVars(suiteOptions.suiteNameTemplate, suiteNameVariables),
          errors: suiteErrors,
          failures: suite.numFailingTests,
          skipped: suite.numPendingTests,
          timestamp: (new Date(suite.perfStats.start)).toISOString().slice(0, -5),
          time: suiteExecutionTime,
          tests: suiteNumTests
        }
      }]
    };

    // Update top level testsuites properties
    jsonResults.testsuites[0]._attr.failures += suite.numFailingTests;
    jsonResults.testsuites[0]._attr.skipped += suite.numPendingTests;
    jsonResults.testsuites[0]._attr.errors += suiteErrors;
    jsonResults.testsuites[0]._attr.tests += suiteNumTests;

    if (!ignoreSuitePropertiesCheck) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const junitSuiteProperties = (require(junitSuitePropertiesFilePath) as SuitePropertiesFactory)(suite);

      // Add any test suite properties
      const testSuitePropertyMain: { properties: XmlLeaf[] } = {
        properties: []
      };

      Object.keys(junitSuiteProperties).forEach((p) => {
        const testSuiteProperty: XmlLeaf = {
          property: {
            _attr: {
              name: p,
              value: replaceVars(junitSuiteProperties[p], suiteNameVariables)
            }
          }
        };

        testSuitePropertyMain.properties.push(testSuiteProperty);
      });

      testSuite.testsuite.push(testSuitePropertyMain);
    }

    // Iterate through test cases
    suite.testResults.forEach((tc: AssertionResult) => {
      const classname = tc.ancestorTitles.join(suiteOptions.ancestorSeparator);
      const testTitle = tc.title;

      // Build replacement map
      const testVariables: SuiteNameVariables = {};
      testVariables[constants.FILEPATH_VAR] = filepath;
      testVariables[constants.FILENAME_VAR] = filename;
      testVariables[constants.SUITENAME_VAR] = suiteTitle;
      testVariables[constants.CLASSNAME_VAR] = classname;
      testVariables[constants.TITLE_VAR] = testTitle;
      testVariables[constants.DISPLAY_NAME_VAR] = displayName ?? '';

      const testCase: { testcase: Array<{ _attr: Record<string, string | number> } | XmlLeaf> } = {
        'testcase': [{
          _attr: {
            classname: replaceVars(suiteOptions.classNameTemplate, testVariables),
            name: replaceVars(suiteOptions.titleTemplate, testVariables),
            time: (tc.duration ?? 0) / 1000,
            file: '',
          },
        }]
      };

      if ((suiteOptions.addFileAttribute as string) === 'true') {
        (testCase.testcase[0] as { _attr: Record<string, string | number> })._attr.file = filepath;
      }

      const tcStatus = tc.status as string;
      if (tcStatus === 'failed' || tcStatus === 'error') {
        const failureDetails = tc.failureDetails as Array<{ message?: string }> | undefined;
        const failureMessages = (options.noStackTrace as string) === 'true' && failureDetails ?
            failureDetails.map((detail) => detail.message ?? '') : tc.failureMessages;

        failureMessages.forEach((failure: string) => {
          const tagName = tcStatus === 'failed' ? 'failure' : 'error';
          testCase.testcase.push({
            [tagName]: stripAnsi(failure)
          });
        })
      }

      if (tc.status === 'pending') {
        testCase.testcase.push({
          skipped: {}
        });
      }

      testSuite.testsuite.push(testCase);
    });

    // Write stdout console output if available
    if ((suiteOptions.includeConsoleOutput as string) === 'true' && suite.console && suite.console.length) {
      // Stringify the entire console object
      // Easier this way because formatting in a readable way is tough with XML
      // And this can be parsed more easily
      const testSuiteConsole: XmlLeaf = {
        'system-out': {
          _cdata: JSON.stringify(suite.console, null, 2)
        }
      };

      testSuite.testsuite.push(testSuiteConsole);
    }

    // Write short stdout console output if available
    if ((suiteOptions.includeShortConsoleOutput as string) === 'true' && suite.console && suite.console.length) {
      // Extract and then Stringify the console message value
      // Easier this way because formatting in a readable way is tough with XML
      // And this can be parsed more easily
      const testSuiteConsole: XmlLeaf = {
        'system-out': {
          _cdata: JSON.stringify(suite.console.map((item: LogEntry) => item.message), null, 2)
        }
      };

      testSuite.testsuite.push(testSuiteConsole);
    }

    jsonResults.testsuites.push(testSuite);
  });

  return jsonResults;
};
