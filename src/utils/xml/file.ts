import { testCase } from './testCase';
import * as path from 'path';
import type { FileInput, XmlLeaf } from '../../types';

export default (testResult: FileInput, relativePaths = false, projectRoot: string | null = null): XmlLeaf => {
    const resolvedPath = relativePaths
      ? path.relative(projectRoot === null ? process.cwd() : path.resolve(projectRoot), testResult.testFilePath)
      : testResult.testFilePath;
    const aFile: XmlLeaf[] = [{ _attr: { path: resolvedPath } }];

    const testCases = testResult.testResults.map(testCase);

    return { file: aFile.concat(testCases) };
}
