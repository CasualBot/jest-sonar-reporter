import { file } from './file';

export const testExecutions = (data: any, formatForSonar56: boolean = false): any => {
  const aTestExecution = [{_attr: {version: '1'}}]
  const testResults = data.testResults.map(file)

  return formatForSonar56
    ? { unitTest: aTestExecution.concat(testResults) }
    : { testExecutions: aTestExecution.concat(testResults) };
}