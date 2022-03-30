import * as path from 'path';
import getOptions from './getOptions';

export default (options: any, jestRootDir: any) => {
  // Override outputName and outputDirectory with outputFile if outputFile is defined
  let output = options.outputFile;
  if (!output) {
    // Set output to use new outputDirectory and fallback on original output
    const outputName =
      options.uniqueOutputName === 'true'
        ? getOptions.getUniqueOutputName()
        : options.outputName;
    output = getOptions.replaceRootDirInOutput(
      jestRootDir,
      options.outputDirectory
    );
    const finalOutput = path.join(output, outputName);
    return finalOutput;
  }

  const finalOutput = getOptions.replaceRootDirInOutput(jestRootDir, output);
  return finalOutput;
};
