import { testCase } from './testCase';
import * as path from 'path';

export default (testResult: any, relativePaths: boolean = false): any  => {
    let aFile: any;

    if(relativePaths){
        aFile = [{_attr: { path: path.relative(process.cwd(), testResult.testFilePath) } }];
    } else {
        aFile = [{_attr: { path: testResult.testFilePath }}];
    }

    const testCases = testResult.testResults.map(testCase)

    return {file: aFile.concat(testCases)}
}