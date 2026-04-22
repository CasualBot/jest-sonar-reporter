import xml from 'xml';
import * as fs from 'fs';
import * as path from 'path';
import type {
  AggregatedResult,
  Test,
  TestContext,
  TestResult as JestTestResult,
} from '@jest/test-result';
import type { Config } from '@jest/types';
import buildXmlReport from './src/utils/buildXmlReport';
import getOptions from './src/utils/getOptions';
import getOutputPath from './src/utils/getOutputPath';
import type { ReporterOptions } from './src/types';

type ConsoleBuffer = JestTestResult['console'];
type TestResultWithConsole = JestTestResult & { console?: ConsoleBuffer };

const consoleBuffer: Record<string, ConsoleBuffer> = {};

const processor = (
  report: AggregatedResult,
  reporterOptions: Partial<ReporterOptions> = {},
  jestRootDir: string | null = null,
) => {
  const options = getOptions.options(reporterOptions);

  report.testResults.forEach((t: TestResultWithConsole) => {
    t.console = consoleBuffer[t.testFilePath];
  });

  const outputPath = getOutputPath(options, jestRootDir);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(outputPath, xml(buildXmlReport(report, options) as unknown as Parameters<typeof xml>[0], { declaration: false, indent: ' ' }));

  return report;
};

interface JestSonarInstance {
  _globalConfig: Config.GlobalConfig;
  _options: Partial<ReporterOptions>;
  onTestResult: (test: Test, testResult: JestTestResult) => void;
  onRunComplete: (contexts: Set<TestContext>, results: AggregatedResult) => void;
}

function JestSonar(
  this: JestSonarInstance,
  globalConfig: Config.GlobalConfig | AggregatedResult,
  options: Partial<ReporterOptions>,
): void {
  if ('testResults' in globalConfig) {
    processor(globalConfig);
    return;
  }

  this._globalConfig = globalConfig;
  this._options = options;

  this.onTestResult = (_test, testResult) => {
    if (testResult.console && testResult.console.length > 0) {
      consoleBuffer[testResult.testFilePath] = testResult.console;
    }
  };

  this.onRunComplete = (_contexts, results) => {
    processor(results, this._options, this._globalConfig.rootDir);
  };
}

module.exports = JestSonar;
