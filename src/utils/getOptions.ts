// Copied from https://raw.githubusercontent.com/jest-community/jest-junit/master/utils/getOptions.js
import * as path from 'path';
import * as fs from 'fs';
import { v1 as uuid } from 'uuid';
import constants from '../constants';
import { replaceRootDirInPath } from './replaceRootDirInPath';

function getEnvOptions() {
  const options: any = {};
  const setupConf: any = constants;

  for (const name in setupConf.ENV_CONFIG_MAP) {
    if (process.env[name]) {
      options[setupConf.ENV_CONFIG_MAP[name] as any] = process.env[name];
    }
  }

  return options;
}

function getAppOptions(pathToResolve: any) {
  let traversing = true;

  // Find nearest package.json by traversing up directories until /
  while (traversing) {
    traversing = pathToResolve !== path.sep;

    const pkgpath = path.join(pathToResolve, 'package.json');

    if (fs.existsSync(pkgpath)) {
      let options = (require(pkgpath) || {})['@casualbot/jest-sonar-reporter'];

      if (Object.prototype.toString.call(options) !== '[object Object]') {
        options = {};
      }

      return options;
    } else {
      pathToResolve = path.dirname(pathToResolve);
    }
  }

  return {};
}

function replaceRootDirInOutput(rootDir: any, output: any) {
  return rootDir !== null ? replaceRootDirInPath(rootDir, output) : output;
}

function getUniqueOutputName() {
  return `jest-sonar-reporter-${uuid()}.xml`;
}

export default {
  options: (reporterOptions = {}) => {
    return Object.assign(
      {},
      constants.DEFAULT_OPTIONS,
      reporterOptions,
      getAppOptions(process.cwd()),
      getEnvOptions()
    );
  },
  getAppOptions: getAppOptions,
  getEnvOptions: getEnvOptions,
  replaceRootDirInOutput: replaceRootDirInOutput,
  getUniqueOutputName: getUniqueOutputName
};
