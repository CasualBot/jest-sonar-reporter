import { join } from 'path';
import { replaceRootDirInOutput, getUniqueOutputName } from './getOptions';
import type { ReporterOptions } from '../types';

/**
 * Determines the output path for the Sonar XML report
 * @param options Reporter options containing output configuration
 * @param jestRootDir The Jest root directory (can be null)
 * @returns The resolved output file path
 */
export const getOutputPath = (options: ReporterOptions, jestRootDir: string | null): string => {
  // Override outputName and outputDirectory with outputFile if outputFile is defined
  const outputFile = options.outputFile;
  if (outputFile) {
    return replaceRootDirInOutput(jestRootDir, outputFile);
  }

  // Determine if we should use a unique output name
  const shouldUseUniqueName = options.uniqueOutputName === true || options.uniqueOutputName === 'true';
  const outputName = shouldUseUniqueName ? getUniqueOutputName() : (options.outputName || 'jest-sonar.xml');
  const outputDir = replaceRootDirInOutput(jestRootDir, options.outputDirectory || '');

  return join(outputDir, outputName);
};