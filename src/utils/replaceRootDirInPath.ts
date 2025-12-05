// Copied from https://github.com/facebook/jest/blob/master/packages/jest-config/src/utils.js
// in order to reduce incompatible jest dependencies
import { resolve, normalize } from 'path';

/**
 * Replaces the <rootDir> token in a file path with the actual root directory path.
 * @param rootDir The root directory path to substitute
 * @param filePath The file path that may contain <rootDir> token
 * @returns The resolved file path with <rootDir> replaced
 */
export const replaceRootDirInPath = (rootDir: string, filePath: string): string => {
  if (!/^<rootDir>/.test(filePath)) {
    return filePath;
  }

  return resolve(
    rootDir,
    normalize(`./${filePath.slice('<rootDir>'.length)}`)
  );
};
