import * as path from 'path';
import getOutputPath from './getOutputPath';
import type { ReporterOptions } from '../types';

const baseOptions: ReporterOptions = {
  suiteName: 'jest tests',
  outputDirectory: 'coverage',
  outputName: 'jest-sonar.xml',
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
    expect(getOutputPath(baseOptions, null)).toBe(path.join('coverage', 'jest-sonar.xml'));
  });

  it('uses outputFile verbatim when provided', () => {
    const options: ReporterOptions = { ...baseOptions, outputFile: 'reports/out.xml' };
    expect(getOutputPath(options, null)).toBe('reports/out.xml');
  });

  it('generates a unique output name when uniqueOutputName is "true"', () => {
    const options: ReporterOptions = { ...baseOptions, uniqueOutputName: 'true' };
    const result = getOutputPath(options, null);
    expect(result).toMatch(/coverage[\\/]jest-sonar-reporter-.+\.xml$/);
  });

  it('replaces <rootDir> in outputDirectory using the jestRootDir argument', () => {
    const options: ReporterOptions = { ...baseOptions, outputDirectory: '<rootDir>/reports' };
    const result = getOutputPath(options, '/project');
    expect(result).toBe(path.join(path.resolve('/project', 'reports'), 'jest-sonar.xml'));
  });

  it('replaces <rootDir> in outputFile using the jestRootDir argument', () => {
    const options: ReporterOptions = { ...baseOptions, outputFile: '<rootDir>/reports/out.xml' };
    expect(getOutputPath(options, '/project')).toBe(path.resolve('/project', 'reports/out.xml'));
  });
});
