import { testCase } from './testCase';

export const file = (testResult: any): any  => {
    //TODO: Make path relative or absolute based on config
    const aFile = [{_attr: {path: testResult.testFilePath}}];
    const testCases = testResult.testResults.map(testCase)

    return {file: aFile.concat(testCases)}
}