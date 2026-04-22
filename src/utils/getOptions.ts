// Copied from https://raw.githubusercontent.com/jest-community/jest-junit/master/utils/getOptions.js
import * as path from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import constants from '../constants';
import { replaceRootDirInPath } from './replaceRootDirInPath';
import type { ReporterOptions } from '../types';

type EnvConfigMap = Record<string, keyof ReporterOptions>;

function getEnvOptions(): Partial<ReporterOptions> {
  const options: Partial<Record<keyof ReporterOptions, string>> = {};
  const envConfigMap = constants.ENV_CONFIG_MAP as EnvConfigMap;

  for (const name in envConfigMap) {
    if (process.env[name]) {
      options[envConfigMap[name]] = process.env[name];
    }
  }

  return options as unknown as Partial<ReporterOptions>;
}

function getAppOptions(pathToResolve: string): Partial<ReporterOptions> {
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
      let options: Partial<ReporterOptions> = {};

      try {
        const pkg = JSON.parse(fs.readFileSync(pkgpath, 'utf8')) as Record<string, unknown>;
        const pkgOptions = pkg?.['@casualbot/jest-sonar-reporter'];
        if (Object.prototype.toString.call(pkgOptions) === '[object Object]') {
          options = pkgOptions as Partial<ReporterOptions>;
        }
      } catch (error) {
        console.warn(`Unable to import package.json to get reporter options: ${error}`);
      }

      return options;
    }
    pathToResolve = path.dirname(pathToResolve);
  }

  return {};
}

function replaceRootDirInOutput(rootDir: string | null, output: string): string {
  return rootDir !== null ? replaceRootDirInPath(rootDir, output) : output;
}

function getUniqueOutputName(): string {
  return `jest-sonar-reporter-${randomUUID()}.xml`
}

export default {
  options: (reporterOptions: Partial<ReporterOptions> = {}): ReporterOptions => {
    return Object.assign({}, constants.DEFAULT_OPTIONS, reporterOptions, getAppOptions(process.cwd()), getEnvOptions()) as ReporterOptions;
  },
  getAppOptions: getAppOptions,
  getEnvOptions: getEnvOptions,
  replaceRootDirInOutput: replaceRootDirInOutput,
  getUniqueOutputName: getUniqueOutputName
};
