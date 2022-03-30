# Jest Sonar Reporter

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=CasualBot_jest-sonar-reporter&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CasualBot_jest-sonar-reporter)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=CasualBot_jest-sonar-reporter&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=CasualBot_jest-sonar-reporter)

`@casualbot/jest-sonar-scanner` is a custom results processor for Jest derived from Christian W. original work [here](https://github.com/3dmind/jest-sonar-reporter).

It has been updated to be usable as a reporter in the `jest.config`, as well as, provide the ability to output relative paths for the generated XML file.  

## Installation

Using npm:

```bash
npm install --save-dev @casualbot/jest-sonar-reporter
```

Using yarn:

```bash
yarn add --dev @casualbot/jest-sonar-reporter
```

## Usage
In your jest config add the following entry:
```JSON
{
  "reporters": [ "default", "@casualbot/jest-sonar-reporter" ]
}
```

Then simply run:

```shell
jest
```

For your Continuous Integration you can simply do:
```shell
jest --ci --reporters=default --reporters=@casualbot/jest-sonar-reporter
```

## Usage as testResultsProcessor (deprecated)
The support for `testResultsProcessor` is only kept for [legacy reasons][test-results-processor] and might be removed in the future. 
You should therefore prefer to configure `@casualbot/jest-sonar-reporter` as a _reporter_.

Should you still want to, add the following entry to your jest config:
```JSON
{
  "testResultsProcessor": "@casualbot/jest-sonar-reporter"
}
```

Then simply run:

```shell
jest
```

For your Continuous Integration you can simply do:
```shell
jest --ci --testResultsProcessor="@casualbot/jest-sonar-reporter"
```

## Configuration

`@casualbot/jest-sonar-reporter` offers several configurations based on environment variables or a `@casualbot/jest-sonar-reporter` key defined in `package.json` or a reporter option.
Environment variable and package.json configuration should be **strings**.
Reporter options should also be strings exception for suiteNameTemplate, classNameTemplate, titleNameTemplate that can also accept a function returning a string.

| Environment Variable Name | Reporter Config Name| Description | Default | Possible Injection Values
|---|---|---|---|---|
| `JEST_SUITE_NAME` | `suiteName` | `name` attribute of `<testsuites>` | `"jest tests"` | N/A
| `JEST_SONAR_OUTPUT_DIR` | `outputDirectory` | Directory to save the output. | `process.cwd()` | N/A
| `JEST_SONAR_OUTPUT_NAME` | `outputName` | File name for the output. | `"jest-report.xml"` | N/A
| `JEST_SONAR_OUTPUT_FILE` | `outputFile` | Fullpath for the output. If defined, `outputDirectory` and `outputName` will be overridden | `undefined` | N/A
| `JEST_SONAR_56_FORMAT` | `formatForSonar56` | Will generate the xml report for Sonar 5.6 | `false` | N/A
| `JEST_SONAR_RELATIVE_PATHS` | `relativePaths` | Will use relative paths when generating the xml report | `false` | N/A
| `JEST_SONAR_UNIQUE_OUTPUT_NAME` | `uniqueOutputName` | Create unique file name for the output `jest-sonar-report-${uuid}.xml`, overrides `outputName` | `false` | N/A
| `JEST_SONAR_SUITE_NAME` | `suiteNameTemplate` | Template string for `name` attribute of the `<testsuite>`. | `"{title}"` | `{title}`, `{filepath}`, `{filename}`, `{displayName}`
| `JEST_SONAR_CLASSNAME` | `classNameTemplate` | Template string for the `classname` attribute of `<testcase>`. | `"{classname} {title}"` | `{classname}`, `{title}`, `{suitename}`, `{filepath}`, `{filename}`, `{displayName}`
| `JEST_SONAR_TITLE` | `titleTemplate` | Template string for the `name` attribute of `<testcase>`. | `"{classname} {title}"` | `{classname}`, `{title}`, `{filepath}`, `{filename}`, `{displayName}`
| `JEST_SONAR_ANCESTOR_SEPARATOR` | `ancestorSeparator` | Character(s) used to join the `describe` blocks. | `" "` | N/A
| `JEST_SONAR_ADD_FILE_ATTRIBUTE` | `addFileAttribute` | Add file attribute to the output. This config is primarily for Circle CI. This setting provides richer details but may break on other CI platforms. Must be a string. | `"false"` | N/A
| `JEST_SONAR_INCLUDE_CONSOLE_OUTPUT` | `includeConsoleOutput` | Adds console output to any testSuite that generates stdout during a test run. | `false` | N/A
| `JEST_SONAR_INCLUDE_SHORT_CONSOLE_OUTPUT` | `includeShortConsoleOutput` | Adds short console output (only message value) to any testSuite that generates stdout during a test run. | `false` | N/A
| `JEST_SONAR_REPORT_TEST_SUITE_ERRORS` | `reportTestSuiteErrors` | Reports test suites that failed to execute altogether as `error`. _Note:_ since the suite name cannot be determined from files that fail to load, it will default to file path.| `false` | N/A
| `JEST_SONAR_NO_STACK_TRACE` | `noStackTrace` | Omit stack traces from test failure reports, similar to `jest --noStackTrace` | `false` | N/A 
| `JEST_USE_PATH_FOR_SUITE_NAME` | `usePathForSuiteName` | **DEPRECATED. Use `suiteNameTemplate` instead.** Use file path as the `name` attribute of `<testsuite>` | `"false"` | N/A


You can configure these options via the command line as seen below:

```shell
JEST_SUITE_NAME="Jest JUnit Unit Tests" JEST_SONAR_OUTPUT_DIR="./artifacts" jest
```

Or you can also define a `@casualbot/jest-sonar-reporter` key in your `package.json`.  All are **string** values.

```json
{
  ...,
  "jest": {
    "rootDir": ".",
    "testResultsProcessor": "@casualbot/jest-sonar-reporter"
  },
  "@casualbot/jest-sonar-reporter": {
    "suiteName": "jest tests",
    "outputDirectory": "coverage",
    "outputName": "jest-report.xml",
    "uniqueOutputName": "false",
    "classNameTemplate": "{classname}-{title}",
    "titleTemplate": "{classname}-{title}",
    "ancestorSeparator": " › ",
    "usePathForSuiteName": "true",
    "relativePaths": "true"
  }
}
```

Or you can define your options in your reporter configuration.

```js
// jest.config.js
{
    reporters: [
        'default', 
        [ 
            '@casualbot/jest-sonar-reporter',
            {
                relativePaths: true,
                outputName: 'sonar-report.xml',
                outputDirectory: 'coverage'
            }
        ]
    ],
}
```

