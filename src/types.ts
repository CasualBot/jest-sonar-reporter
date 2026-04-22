import type xmlModule from 'xml';

export type TemplateFunction = (vars: Record<string, string>) => string;

export interface ReporterOptions {
  suiteName: string;
  outputDirectory: string;
  outputName: string;
  outputFile?: string;
  uniqueOutputName: string | boolean;
  classNameTemplate: string | TemplateFunction;
  suiteNameTemplate: string | TemplateFunction;
  titleTemplate: string | TemplateFunction;
  ancestorSeparator: string;
  addFileAttribute: string | boolean;
  includeConsoleOutput: string | boolean;
  includeShortConsoleOutput: string | boolean;
  reportTestSuiteErrors: string | boolean;
  noStackTrace: string | boolean;
  usePathForSuiteName: string | boolean;
  testSuitePropertiesFile: string;
  relativePaths: boolean;
  projectRoot: string | null;
  formatForSonar56: string | boolean;
}

export type XmlLeaf = xmlModule.XmlObject;

export interface TestCaseInput {
  title?: string;
  fullName?: string;
  duration?: number | null;
  status?: string;
  failureMessages?: ReadonlyArray<string>;
}

export interface FileInput {
  testFilePath: string;
  testResults: ReadonlyArray<TestCaseInput>;
}

export interface BuildXmlReportInput {
  testResults: ReadonlyArray<FileInput>;
}
