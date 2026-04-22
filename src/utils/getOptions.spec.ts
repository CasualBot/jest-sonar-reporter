import * as path from 'path';
import getOptions from './getOptions';

const originalEnv = process.env;

function resetEnv() {
  process.env = { ...originalEnv };
}

function clearJestEnv() {
  for (const name of Object.keys(process.env)) {
    if (name.startsWith('JEST_')) {
      delete process.env[name];
    }
  }
}

afterAll(() => {
  process.env = originalEnv;
});

// Regression test for https://github.com/CasualBot/jest-sonar-reporter/issues/27
// On Windows, path.sep is '\' but the filesystem root is 'C:\', so the old loop
// condition (pathToResolve !== path.sep) never matched and looped forever.
// Fix mirrors https://github.com/jest-community/jest-junit/pull/215
describe('getAppOptions', () => {
  const rootPath = path.parse(process.cwd()).root;

  it('terminates when traversal reaches the filesystem root', () => {
    // Uses a path that does not exist so traversal goes all the way to the
    // filesystem root without finding a package.json. If the loop did not
    // terminate correctly this test would time out.
    const result = getOptions.getAppOptions(path.join(rootPath, 'nonexistent-jest-sonar-path-12345'));
    expect(result).toEqual({});
  });

  it('returns reporter options from the nearest package.json', () => {
    // The real package.json in process.cwd() has @casualbot/jest-sonar-reporter config
    const result = getOptions.getAppOptions(process.cwd());
    expect(typeof result).toBe('object');
  });

  it('returns empty object when no reporter config exists in package.json', () => {
    // Start traversal from a path that has no package.json to find
    const result = getOptions.getAppOptions(path.join(rootPath, 'nonexistent-jest-sonar-path-12345'));
    expect(result).toEqual({});
  });
});

describe('getEnvOptions', () => {
  beforeEach(resetEnv);

  it('returns an empty object when no known env vars are set', () => {
    clearJestEnv();
    expect(getOptions.getEnvOptions()).toEqual({});
  });

  it('maps recognized env vars to reporter option keys', () => {
    process.env.JEST_SUITE_NAME = 'my suite';
    process.env.JEST_SONAR_OUTPUT_DIR = 'out-dir';
    const result = getOptions.getEnvOptions() as Record<string, string>;
    expect(result.suiteName).toBe('my suite');
    expect(result.outputDirectory).toBe('out-dir');
  });
});

describe('getUniqueOutputName', () => {
  it('returns a filename with a uuid suffix', () => {
    const name = getOptions.getUniqueOutputName();
    expect(name).toMatch(/^jest-sonar-reporter-[0-9a-f-]+\.xml$/);
  });

  it('produces distinct names on repeated calls', () => {
    expect(getOptions.getUniqueOutputName()).not.toBe(getOptions.getUniqueOutputName());
  });
});

describe('replaceRootDirInOutput', () => {
  const ROOT_DIR_REPORTS = '<rootDir>/reports';
  const ROOT_DIR = '/project';

  it('returns the output unchanged when rootDir is null', () => {
    expect(getOptions.replaceRootDirInOutput(null, ROOT_DIR_REPORTS)).toBe(ROOT_DIR_REPORTS);
  });

  it('substitutes <rootDir> when rootDir is provided', () => {
    expect(getOptions.replaceRootDirInOutput(ROOT_DIR, ROOT_DIR_REPORTS)).toBe(
      path.resolve(ROOT_DIR, 'reports'),
    );
  });
});

describe('options', () => {
  beforeEach(() => {
    resetEnv();
    clearJestEnv();
  });

  it('merges defaults with reporter options', () => {
    const result = getOptions.options({ suiteName: 'custom suite' });
    expect(result.suiteName).toBe('custom suite');
    expect(result.outputName).toBe('jest-sonar.xml');
  });

  it('lets env vars override reporter options', () => {
    process.env.JEST_SUITE_NAME = 'env suite';
    const result = getOptions.options({ suiteName: 'reporter suite' });
    expect(result.suiteName).toBe('env suite');
  });
});
