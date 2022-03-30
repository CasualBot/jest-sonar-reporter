// Copied from https://github.com/facebook/jest/blob/master/packages/jest-config/src/utils.js
// in order to reduce incompatible jest dependencies
import * as path from 'path';

export const replaceRootDirInPath = (
  rootDir: string,
  filePath: string
): any => {
  if (!/^<rootDir>/.test(filePath)) {
    return filePath;
  }

  return path.resolve(
    rootDir,
    path.normalize('./' + filePath.substr('<rootDir>'.length))
  );
};
