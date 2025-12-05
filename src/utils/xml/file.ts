import { testCase } from './testCase';
import { relative } from 'path';
import type { TestSuiteResult } from '../../types';

/**
 * Builds an XML file element containing test cases from a test suite result
 * @param testResult The test suite result to convert
 * @param relativePaths Whether to use relative paths in the output
 * @param projectRoot The project root directory for computing relative paths
 * @returns XML structure for a file element
 */
export const buildFile = (
    testResult: TestSuiteResult,
    relativePaths = false,
    projectRoot: string | null = null
): any => {
    const filePath = relativePaths
        ? relative(projectRoot ?? process.cwd(), testResult.testFilePath)
        : testResult.testFilePath;

    const aFile = [{ _attr: { path: filePath } }];
    const testCases = testResult.testResults.map(testCase);

    return { file: aFile.concat(testCases) };
};
