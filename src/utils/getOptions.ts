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

  // Get the root dir to detect when we reached the end of our search.
  // path.parse().root handles both Unix ('/') and Windows ('C:\') roots,
  // fixing a non-terminating loop when no package.json exists on Windows.
  // See: https://github.com/jest-community/jest-junit/pull/215
  const rootDir = path.parse(pathToResolve).root;

  // Find nearest package.json by traversing up directories until root
  while(traversing) {
    traversing = pathToResolve !== rootDir;

    const pkgpath = path.join(pathToResolve, 'package.json');

    if (fs.existsSync(pkgpath)) {
      let options;

      try {
        options = (require(pkgpath) || {})['@casualbot/jest-sonar-reporter'];
      } catch (error) {
        console.warn(`Unable to import package.json to get reporter options: ${error}`);
      }

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
  return `jest-sonar-reporter-${uuid()}.xml`
}

export default {
  options: (reporterOptions = {}) => {
    return Object.assign({}, constants.DEFAULT_OPTIONS, reporterOptions, getAppOptions(process.cwd()), getEnvOptions());
  },
  getAppOptions: getAppOptions,
  getEnvOptions: getEnvOptions,
  replaceRootDirInOutput: replaceRootDirInOutput,
  getUniqueOutputName: getUniqueOutputName
};