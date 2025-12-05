// Copied from https://raw.githubusercontent.com/jest-community/jest-junit/master/utils/buildJsonResults.js
import stripAnsi from 'strip-ansi';
import constants from '../constants';
import { join, relative, basename } from 'path';
import { existsSync } from 'fs';
import type { AggregatedResult, ReporterOptions } from '../types';

const toTemplateTag = (varName: string): string => `{${varName}}`;

const replaceVars = (strOrFunc: string | ((variables: Record<string, string>) => string), variables: Record<string, string>): string => {
  if (typeof strOrFunc === 'string') {
    let result = strOrFunc;
    Object.entries(variables).forEach(([varName, value]) => {
      result = result.replace(toTemplateTag(varName), value);
    });
    return result;
  }

  const result = strOrFunc(variables);
  if (typeof result !== 'string') {
    throw new Error('Template function should return a string');
  }
  return result;
};

const executionTime = (startTime: number, endTime: number): number => (endTime - startTime) / 1000;

const addErrorTestResult = (suite: any): void => {
  suite.testResults.push({
    ancestorTitles: [],
    duration: 0,
    failureMessages: [suite.failureMessage],
    numPassingAsserts: 0,
    status: 'error'
  });
};

export const buildJsonResults = (report: AggregatedResult, appDirectory: string, options: ReporterOptions): any => {
  const junitSuitePropertiesFilePath = join(process.cwd(), options.testSuitePropertiesFile || 'jestSonarProperties.js');
  const ignoreSuitePropertiesCheck = !existsSync(junitSuitePropertiesFilePath);

  // If the usePathForSuiteName option is true and the
  // suiteNameTemplate value is set to the default, overrides
  // the suiteNameTemplate.
  const shouldUsePathForSuiteName = options.usePathForSuiteName === true || options.usePathForSuiteName === 'true';
  if (shouldUsePathForSuiteName && options.suiteNameTemplate === toTemplateTag(constants.TITLE_VAR)) {
    options.suiteNameTemplate = toTemplateTag(constants.FILEPATH_VAR);
  }

  // Generate a single XML file for all jest tests
  const jsonResults = {
    testsuites: [{
      _attr: {
        name: options.suiteName,
        tests: 0,
        failures: 0,
        errors: 0,
        skipped: 0,
        time: executionTime(report.startTime, Date.now())
      }
    }]
  };

  // Iterate through outer testResults (test suites)
  report.testResults.forEach((suite: any) => {
    const noResults = suite.testResults.length === 0;
    if (noResults && options.reportTestSuiteErrors === 'false') {
      return;
    }

    const noResultOptions = noResults
      ? {
        suiteNameTemplate: toTemplateTag(constants.FILEPATH_VAR),
        titleTemplate: toTemplateTag(constants.FILEPATH_VAR),
        classNameTemplate: 'Test suite failed to run'
      }
      : {};

    const suiteOptions = { ...options, ...noResultOptions };
    if (noResults) {
      addErrorTestResult(suite);
    }

    // Build variables for suite name
    const filepath = relative(appDirectory, suite.testFilePath);
    const filename = basename(filepath);
    const suiteTitle = suite.testResults[0]?.ancestorTitles[0] ?? '';
    const displayName = typeof suite.displayName === 'object' ? suite.displayName.name : suite.displayName;

    // Build replacement map
    const suiteNameVariables: Record<string, string> = {
      [constants.FILEPATH_VAR]: filepath,
      [constants.FILENAME_VAR]: filename,
      [constants.TITLE_VAR]: suiteTitle,
      [constants.DISPLAY_NAME_VAR]: displayName || ''
    };

    // Add <testsuite /> properties
    const suiteNumTests = suite.numFailingTests + suite.numPassingTests + suite.numPendingTests;
    const suiteExecutionTime = executionTime(suite.perfStats.start, suite.perfStats.end);

    const suiteErrors = noResults ? 1 : 0;
    const testSuite = {
      testsuite: [{
        _attr: {
          name: replaceVars(suiteOptions.suiteNameTemplate || '', suiteNameVariables),
          errors: suiteErrors,
          failures: suite.numFailingTests,
          skipped: suite.numPendingTests,
          timestamp: new Date(suite.perfStats.start).toISOString().slice(0, -5),
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
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const junitSuiteProperties = require(junitSuitePropertiesFilePath)(suite);

      // Add any test suite properties
      const testSuitePropertyMain: any = {
        properties: []
      };

      Object.entries(junitSuiteProperties).forEach(([propName, propValue]) => {
        const testSuiteProperty: any = {
          property: {
            _attr: {
              name: propName,
              value: replaceVars(propValue as string, suiteNameVariables)
            }
          }
        };

        testSuitePropertyMain.properties.push(testSuiteProperty);
      });

      testSuite.testsuite.push(testSuitePropertyMain);
    }

    // Iterate through test cases
    suite.testResults.forEach((tc: any) => {
      const classname = tc.ancestorTitles.join(suiteOptions.ancestorSeparator || ' ');
      const testTitle = tc.title;

      // Build replacement map
      const testVariables: Record<string, string> = {
        [constants.FILEPATH_VAR]: filepath,
        [constants.FILENAME_VAR]: filename,
        [constants.SUITENAME_VAR]: suiteTitle,
        [constants.CLASSNAME_VAR]: classname,
        [constants.TITLE_VAR]: testTitle,
        [constants.DISPLAY_NAME_VAR]: displayName || ''
      };

      const testCase: any = {
        testcase: [{
          _attr: {
            classname: replaceVars(suiteOptions.classNameTemplate || '', testVariables),
            name: replaceVars(suiteOptions.titleTemplate || '', testVariables),
            time: tc.duration / 1000,
            file: ''
          }
        }]
      };

      if (suiteOptions.addFileAttribute === 'true') {
        testCase.testcase[0]._attr.file = filepath;
      }

      if (tc.status === 'failed' || tc.status === 'error') {
        const failureMessages =
          options.noStackTrace === 'true' && tc.failureDetails
            ? tc.failureDetails.map((detail: any) => detail.message)
            : tc.failureMessages;

        failureMessages.forEach((failure: string) => {
          const tagName = tc.status === 'failed' ? 'failure' : 'error';
          testCase.testcase.push({
            [tagName]: stripAnsi(failure)
          });
        });
      }

      if (tc.status === 'pending') {
        testCase.testcase.push({
          skipped: {}
        });
      }

      testSuite.testsuite.push(testCase);
    });

    // Write stdout console output if available
    if (suiteOptions.includeConsoleOutput === 'true' && suite.console?.length) {
      const testSuiteConsole: any = {
        'system-out': {
          _cdata: JSON.stringify(suite.console, null, 2)
        }
      };

      testSuite.testsuite.push(testSuiteConsole);
    }

    // Write short stdout console output if available
    if (suiteOptions.includeShortConsoleOutput === 'true' && suite.console?.length) {
      const testSuiteConsole: any = {
        'system-out': {
          _cdata: JSON.stringify(
            suite.console.map((item: any) => item.message),
            null,
            2
          )
        }
      };

      testSuite.testsuite.push(testSuiteConsole);
    }

    jsonResults.testsuites.push(testSuite as any);
  });

  return jsonResults;
};
