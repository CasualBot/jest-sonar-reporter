import { testCase } from './testCase';
import * as path from 'path';
import type { FileInput, XmlLeaf } from '../../types';

export default (testResult: FileInput, relativePaths = false, projectRoot: string | null = null): XmlLeaf => {
    let aFile: XmlLeaf[];

    if (relativePaths) {
        const relativeRoot = projectRoot == null ? process.cwd() : path.resolve(projectRoot);
        aFile = [{_attr: { path: path.relative(relativeRoot, testResult.testFilePath) } }];
    } else {
        aFile = [{_attr: { path: testResult.testFilePath }}];
    }

    const testCases = testResult.testResults.map(testCase)

    return {file: aFile.concat(testCases)}
}
