import { testCase } from './testCase';
import * as path from 'path';
import type { FileInput, XmlLeaf } from '../../types';

function resolveFilePath(filePath: string, relativePaths: boolean, projectRoot: string | null): string {
  if (!relativePaths) {
    return filePath;
  }
  const relativeRoot = projectRoot === null ? process.cwd() : path.resolve(projectRoot);
  return path.relative(relativeRoot, filePath);
}

export default (testResult: FileInput, relativePaths = false, projectRoot: string | null = null): XmlLeaf => {
    const resolvedPath = resolveFilePath(testResult.testFilePath, relativePaths, projectRoot);
    const aFile: XmlLeaf[] = [{ _attr: { path: resolvedPath } }];

    const testCases = testResult.testResults.map(testCase);

    return { file: aFile.concat(testCases) };
}
