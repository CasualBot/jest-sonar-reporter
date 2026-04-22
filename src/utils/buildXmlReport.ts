import file from './xml/file';
import type { BuildXmlReportInput, ReporterOptions, XmlLeaf } from '../types';

type BuildXmlReportOptions = Pick<ReporterOptions, 'relativePaths' | 'projectRoot' | 'formatForSonar56'>;

export default (data: BuildXmlReportInput, options: boolean | Partial<BuildXmlReportOptions> = {}): XmlLeaf => {
  const opts: Partial<BuildXmlReportOptions> = typeof options === 'object' && options !== null ? options : {};
  const aTestExecution: XmlLeaf[] = [{ _attr: { version: '1' } }];
  const testResults = data.testResults.map((result) =>
    file(result, opts.relativePaths, opts.projectRoot ?? null),
  );

  return opts?.formatForSonar56
    ? { unitTest: aTestExecution.concat(testResults) }
    : { testExecutions: aTestExecution.concat(testResults) };
};
