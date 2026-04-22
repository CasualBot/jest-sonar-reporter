import * as path from 'path';
import getOutputPath from './getOutputPath';
import type { ReporterOptions } from '../types';

const OUTPUT_DIR = 'coverage';
const OUTPUT_NAME = 'jest-sonar.xml';
const OUTPUT_FILE = 'reports/out.xml';
const ROOT_DIR = '/project';
const ROOT_DIR_REPORTS = '<rootDir>/reports';

const baseOptions: ReporterOptions = {
  suiteName: 'jest tests',
  outputDirectory: OUTPUT_DIR,
  outputName: OUTPUT_NAME,
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
  formatForSonar56: false,
};

describe('getOutputPath', () => {
  it('joins outputDirectory with outputName when outputFile is not set', () => {
    expect(getOutputPath(baseOptions, null)).toBe(path.join(OUTPUT_DIR, OUTPUT_NAME));
  });

  it('uses outputFile verbatim when provided', () => {
    const options: ReporterOptions = { ...baseOptions, outputFile: OUTPUT_FILE };
    expect(getOutputPath(options, null)).toBe(OUTPUT_FILE);
  });

  it('generates a unique output name when uniqueOutputName is "true"', () => {
    const options: ReporterOptions = { ...baseOptions, uniqueOutputName: 'true' };
    const result = getOutputPath(options, null);
    expect(result).toMatch(/coverage[\\/]jest-sonar-reporter-.+\.xml$/);
  });

  it('replaces <rootDir> in outputDirectory using the jestRootDir argument', () => {
    const options: ReporterOptions = { ...baseOptions, outputDirectory: ROOT_DIR_REPORTS };
    const result = getOutputPath(options, ROOT_DIR);
    expect(result).toBe(path.join(path.resolve(ROOT_DIR, 'reports'), OUTPUT_NAME));
  });

  it('replaces <rootDir> in outputFile using the jestRootDir argument', () => {
    const options: ReporterOptions = { ...baseOptions, outputFile: `<rootDir>/${OUTPUT_FILE}` };
    expect(getOutputPath(options, ROOT_DIR)).toBe(path.resolve(ROOT_DIR, OUTPUT_FILE));
  });
});
