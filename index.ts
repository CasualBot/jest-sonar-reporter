import * as fs from 'fs';
import * as path from 'path';
import * as xml from 'xml';
import getPackageData from './src/utils/getPackageData';
import getConfig from './src/utils/getConfig'
import xmlIndent from './src/utils/xmlIndent';
import { testExecutions } from './src/xml/testExecutions';
import { getDefaultConfig } from './src/getDefaultConfig';


const root = process.cwd()
const packageData = getPackageData(root)

const config = { 
  ...getDefaultConfig(root),
  ...getConfig(packageData, process.env.NODE_ENV)
};
const consoleBuffer = {};

const processor = (results, reporterOptions = {}, jestRootDir = null): any => { 

  const report = xml(testExecutions(results, config.sonar56x), {declaration: true, indent: xmlIndent(config.indent)})

  if (!fs.existsSync(config.reportPath)) {
    fs.mkdirSync(config.reportPath)
  }

  const reportFile = path.join(config.reportPath, config.reportFile)
  fs.writeFileSync(reportFile, report)

  if (process.env.DEBUG) {
    fs.writeFileSync('debug.json', JSON.stringify(results, null, 2))
  }

  return results
}


function JestSonarReporter (globalConfig: any, options: Object) {

  if (globalConfig.hasOwnProperty('testResults')) {
    return processor(globalConfig);
  }

  this._globalConfig = globalConfig;
  this._options = options;

  this.onTestResult = (testResult) => {
    if (testResult.console && testResult.console.length > 0) {
      consoleBuffer[testResult.testFilePath] = testResult.console;
    }
  };

  this.onRunComplete = (results) => {
    processor(results, this._options, this._globalConfig.rootDir);
  };
}

export default JestSonarReporter;