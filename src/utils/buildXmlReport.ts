import { buildFile } from './xml/file';
import type { AggregatedResult, ReporterOptions } from '../types';

/**
 * Builds the XML report structure from test results
 * @param data The aggregated test results
 * @param options Reporter options controlling XML format
 * @returns XML structure for the entire test execution report
 */
export const buildXmlReport = (data: AggregatedResult, options: ReporterOptions = {}): any => {
  const aTestExecution = [{ _attr: { version: '1' } }];
  const testResults = data.testResults.map((result) =>
    buildFile(result, options.relativePaths, options.projectRoot)
  );

  return options?.formatForSonar56
    ? { unitTest: aTestExecution.concat(testResults) }
    : { testExecutions: aTestExecution.concat(testResults) };
};
