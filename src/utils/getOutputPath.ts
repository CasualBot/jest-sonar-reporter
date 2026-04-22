import * as path from 'path';
import getOptions from './getOptions';
import type { ReporterOptions } from '../types';

export default (options: ReporterOptions, jestRootDir: string | null): string => {
  // Override outputName and outputDirectory with outputFile if outputFile is defined
  const output = options.outputFile;
  if (!output) {
    // Set output to use new outputDirectory and fallback on original output
    const outputName = (options.uniqueOutputName === 'true') ? getOptions.getUniqueOutputName() : options.outputName
    const outputDir = getOptions.replaceRootDirInOutput(jestRootDir, options.outputDirectory);
    return path.join(outputDir, outputName);
  }

  return getOptions.replaceRootDirInOutput(jestRootDir, output);
};
