import xml from 'xml';
import { sync as mkdirpSync } from 'mkdirp';
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { buildXmlReport } from './src/utils/buildXmlReport';
import { options as resolveOptions } from './src/utils/getOptions';
import { getOutputPath } from './src/utils/getOutputPath';
import type { JestGlobalConfig, AggregatedResult, ReporterOptions } from './src/types';

const consoleBuffer = new Map<string, any>();

const processor = (
  report: AggregatedResult,
  reporterOptions: ReporterOptions = {},
  jestRootDir: string | null = null
): AggregatedResult => {
  const options = resolveOptions(reporterOptions);

  report.testResults.forEach((testSuite) => {
    if (consoleBuffer.has(testSuite.testFilePath)) {
      testSuite.console = consoleBuffer.get(testSuite.testFilePath);
    }
  });

  const outputPath = getOutputPath(options, jestRootDir);

  mkdirpSync(dirname(outputPath));

  writeFileSync(
    outputPath,
    xml(buildXmlReport(report, options), { declaration: false, indent: ' ' })
  );

  return report;
};

/**
 * Jest Sonar Reporter - Main reporter class
 * Implements the Jest reporter API to generate Sonar-compatible XML reports
 */
export default class JestSonar {
  private readonly globalConfig: JestGlobalConfig;
  private readonly reporterOptions: ReporterOptions;

  constructor(globalConfig: JestGlobalConfig, reporterOptions: ReporterOptions = {}) {
    if ('testResults' in globalConfig) {
      processor(globalConfig as any);
      return;
    }

    this.globalConfig = globalConfig;
    this.reporterOptions = reporterOptions;
  }

  onTestResult(_test: any, testResult: any): void {
    if (testResult.console && testResult.console.length > 0) {
      consoleBuffer.set(testResult.testFilePath, testResult.console);
    }
  }

  onRunComplete(_contexts: any, results: AggregatedResult): void {
    processor(results, this.reporterOptions, this.globalConfig.rootDir ?? null);
  }
}