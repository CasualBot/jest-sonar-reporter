import GlobalConfiguration from './interfaces/global-config';
import Results from './interfaces/results';
import Report from './report';

export default class JestSonar {
  private _globalConfig: GlobalConfiguration;
  private _options: object;
  private consoleBuffer: object = {};

  constructor(globalConfig: GlobalConfiguration, options: object) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  private report = new Report();

  getConsoleBugger(): object {
    return this.consoleBuffer;
  }

  /**
   * TODO:
   *  - interfaces for test and testResult
   *  -
   * @param test
   * @param testResult
   */
  onTestResult(test, testResult): void {
    if (testResult.console && testResult.console.length > 0) {
      this.consoleBuffer[testResult.testFilePath] = testResult.console;
    }
  }

  /**
   * TODO:
   * - Contexts interface
   * https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options
   * @param contexts Context in which the jest suite was ran
   * @param results Results object from executed tests
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRunComplete(contexts: object, results: Results): void {
    // TODO: This needs to be hooked up
    // this.report.process(results, this._options, this._globalConfig.rootDir);
  }
}
