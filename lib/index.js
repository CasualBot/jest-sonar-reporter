"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const xml = require("xml");
const getPackageData_1 = require("./src/utils/getPackageData");
const getConfig_1 = require("./src/utils/getConfig");
const xmlIndent_1 = require("./src/utils/xmlIndent");
const testExecutions_1 = require("./src/xml/testExecutions");
const getDefaultConfig_1 = require("./src/getDefaultConfig");
const root = process.cwd();
const packageData = (0, getPackageData_1.default)(root);
const config = Object.assign(Object.assign({}, (0, getDefaultConfig_1.getDefaultConfig)(root)), (0, getConfig_1.default)(packageData, process.env.NODE_ENV));
const consoleBuffer = {};
const processor = (results, reporterOptions = {}, jestRootDir = null) => {
    const report = xml((0, testExecutions_1.testExecutions)(results, config.sonar56x), { declaration: true, indent: (0, xmlIndent_1.default)(config.indent) });
    if (!fs.existsSync(config.reportPath)) {
        fs.mkdirSync(config.reportPath);
    }
    const reportFile = path.join(config.reportPath, config.reportFile);
    fs.writeFileSync(reportFile, report);
    if (process.env.DEBUG) {
        fs.writeFileSync('debug.json', JSON.stringify(results, null, 2));
    }
    return results;
};
function JestSonarReporter(globalConfig, options) {
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
exports.default = JestSonarReporter;
