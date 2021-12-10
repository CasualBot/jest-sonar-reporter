import xml from 'xml';
const mkdirp = require('mkdirp');
import * as fs from 'fs';
import * as path from 'path';
import buildXmlReport from './src/utils/buildXmlReport';
import getOptions from './src/utils/getOptions';
import getOutputPath from './src/utils/getOutputPath';

const consoleBuffer: any = {};

const processor = (report: any, reporterOptions: Object = {}, jestRootDir = null) => {
  const options = getOptions.options(reporterOptions);

  report.testResults.forEach((t: any, i: any) => {
    t.console = consoleBuffer[t.testFilePath];
  });

  let outputPath = getOutputPath(options, jestRootDir);

  mkdirp.sync(path.dirname(outputPath));

  fs.writeFileSync(outputPath, xml(buildXmlReport(report, options), {declaration: false, indent: ' '}));

  return report;
};

function JestSonar(this: any, globalConfig: any, options: any): void {

  if (globalConfig.hasOwnProperty('testResults')) {
    const newConfig = JSON.stringify({
      reporters: ['jest-sonar-reporter']
    }, null, 2);

    return processor(globalConfig);
  }

  this._globalConfig = globalConfig;
  this._options = options;

  this.onTestResult = (test: any, testResult: any, aggregatedResult: any) => {
    if (testResult.console && testResult.console.length > 0) {
      consoleBuffer[testResult.testFilePath] = testResult.console;
    }
  };

  this.onRunComplete = (contexts: any, results: any) => {
    processor(results, this._options, this._globalConfig.rootDir);
  };
}

module.exports = JestSonar;