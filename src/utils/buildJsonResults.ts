// Copied from https://raw.githubusercontent.com/jest-community/jest-junit/master/utils/buildJsonResults.js
import stripAnsi from 'strip-ansi';
import constants from '../constants'; 
import * as path from 'path';
import * as fs from 'fs';

const toTemplateTag = function (varName: string) {
  return "{" + varName + "}";
}

const replaceVars = function (strOrFunc: any, variables: any) {
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

const executionTime = function (startTime: any, endTime: any) {
  return (endTime - startTime) / 1000;
}

const addErrorTestResult = function (suite: any) {
  suite.testResults.push({
    "ancestorTitles": [],
    "duration": 0,
    "failureMessages": [
      suite.failureMessage
    ],
    "numPassingAsserts": 0,
    "status": "error"
  })
}

export default (report: any, appDirectory: any, options: any): any => {
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
  const jsonResults = {
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
  report.testResults.forEach((suite: any) => {
    const noResults = suite.testResults.length === 0;
    if (noResults && options.reportTestSuiteErrors === 'false') {
      return;
    }

    const noResultOptions = noResults ? {
      suiteNameTemplate: toTemplateTag(constants.FILEPATH_VAR),
      titleTemplate: toTemplateTag(constants.FILEPATH_VAR),
      classNameTemplate: `Test suite failed to run`
    } : {};

    const suiteOptions = Object.assign({}, options, noResultOptions);
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
    const suiteNameVariables: string | any = {};
    suiteNameVariables[constants.FILEPATH_VAR] = filepath;
    suiteNameVariables[constants.FILENAME_VAR] = filename;
    suiteNameVariables[constants.TITLE_VAR] = suiteTitle;
    suiteNameVariables[constants.DISPLAY_NAME_VAR] = displayName;

    // Add <testsuite /> properties
    const suiteNumTests = suite.numFailingTests + suite.numPassingTests + suite.numPendingTests;
    const suiteExecutionTime = executionTime(suite.perfStats.start, suite.perfStats.end);

    const suiteErrors = noResults ? 1 : 0;
    const testSuite = {
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
      const junitSuiteProperties = require(junitSuitePropertiesFilePath)(suite); // eslint-disable-line 

      // Add any test suite properties
      const testSuitePropertyMain: any = {
        properties: []
      };

      Object.keys(junitSuiteProperties).forEach((p) => {
        const testSuiteProperty: any = {
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
    suite.testResults.forEach((tc: any) => {
      const classname = tc.ancestorTitles.join(suiteOptions.ancestorSeparator);
      const testTitle = tc.title;

      // Build replacement map
      const testVariables: string | any = {};
      testVariables[constants.FILEPATH_VAR] = filepath;
      testVariables[constants.FILENAME_VAR] = filename;
      testVariables[constants.SUITENAME_VAR] = suiteTitle;
      testVariables[constants.CLASSNAME_VAR] = classname;
      testVariables[constants.TITLE_VAR] = testTitle;
      testVariables[constants.DISPLAY_NAME_VAR] = displayName;

      const testCase: any = {
        'testcase': [{
          _attr: {
            classname: replaceVars(suiteOptions.classNameTemplate, testVariables),
            name: replaceVars(suiteOptions.titleTemplate, testVariables),
            time: tc.duration / 1000,
            file: '',
            
          },
        }]
      };

      if (suiteOptions.addFileAttribute === 'true') {
        testCase.testcase[0]._attr.file = filepath;
      }

      if (tc.status === 'failed'|| tc.status === 'error') {
        const failureMessages = options.noStackTrace === 'true' && tc.failureDetails ?
            tc.failureDetails.map((detail: any) => detail.message) : tc.failureMessages;

        failureMessages.forEach((failure: any) => {
          const tagName = tc.status === 'failed' ? 'failure': 'error'
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
    if (suiteOptions.includeConsoleOutput === 'true' && suite.console && suite.console.length) {
      // Stringify the entire console object
      // Easier this way because formatting in a readable way is tough with XML
      // And this can be parsed more easily
      const testSuiteConsole: any = {
        'system-out': {
          _cdata: JSON.stringify(suite.console, null, 2)
        }
      };

      testSuite.testsuite.push(testSuiteConsole);
    }

    // Write short stdout console output if available
    if (suiteOptions.includeShortConsoleOutput === 'true' && suite.console && suite.console.length) {
      // Extract and then Stringify the console message value
      // Easier this way because formatting in a readable way is tough with XML
      // And this can be parsed more easily
      const testSuiteConsole: any = {
        'system-out': {
          _cdata: JSON.stringify(suite.console.map((item: any) => item.message), null, 2)
        }
      };

      testSuite.testsuite.push(testSuiteConsole);
    }

    jsonResults.testsuites.push(testSuite as any);
  });

  return jsonResults;
};

