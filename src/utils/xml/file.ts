import { testCase } from './testCase';
import * as path from 'path';

export default (testResult: any, relativePaths = false, projectRoot: string | null): any  => {
    let aFile: any;

    if (relativePaths) {
        const relativeRoot = projectRoot == null ? process.cwd() : path.resolve(projectRoot);
        aFile = [{_attr: { path: path.relative(relativeRoot, testResult.testFilePath) } }];
    } else {
        aFile = [{_attr: { path: testResult.testFilePath }}];
    }

    const testCases = testResult.testResults.map(testCase)

    return {file: aFile.concat(testCases)}
}
