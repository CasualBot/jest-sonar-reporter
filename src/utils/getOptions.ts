import { sep, join, dirname } from 'path';
import { existsSync } from 'fs';
import { v1 as uuid } from 'uuid';
import constants from '../constants';
import { replaceRootDirInPath } from './replaceRootDirInPath';
import type { ReporterOptions } from '../types';

/**
 * Merges options from multiple sources: defaults, reporter options, app config, and environment variables
 * This is the main public API for option resolution.
 */
export const options = (reporterOptions: ReporterOptions = {}): ReporterOptions => {
  return {
    ...constants.DEFAULT_OPTIONS,
    ...reporterOptions,
    ..._getAppOptions(process.cwd()),
    ..._getEnvOptions()
  };
};

/**
 * Generates a unique output filename with UUID
 * @internal
 */
export const getUniqueOutputName = (): string => `jest-sonar-reporter-${uuid()}.xml`;

/**
 * Replaces <rootDir> token in output paths
 * @internal
 */
export const replaceRootDirInOutput = (rootDir: string | null, output: string): string =>
  rootDir !== null ? replaceRootDirInPath(rootDir, output) : output;

/**
 * Reads configuration from package.json
 * @internal
 */
const _getAppOptions = (pathToResolve: string): ReporterOptions => {
  let currentPath = pathToResolve;
  let shouldContinue = true;

  while (shouldContinue) {
    shouldContinue = currentPath !== sep;
    const pkgpath = join(currentPath, 'package.json');

    if (existsSync(pkgpath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const pkg = require(pkgpath);
      const appOptions = pkg['@casualbot/jest-sonar-reporter'];

      if (typeof appOptions === 'object' && !Array.isArray(appOptions)) {
        return appOptions;
      }

      return {};
    }

    currentPath = dirname(currentPath);
  }

  return {};
};

/**
 * Reads configuration from environment variables
 * @internal
 */
const _getEnvOptions = (): ReporterOptions => {
  const envOptions: any = {};

  Object.entries(constants.ENV_CONFIG_MAP).forEach(([envName, optionKey]) => {
    if (process.env[envName]) {
      envOptions[optionKey] = process.env[envName];
    }
  });

  return envOptions;
};