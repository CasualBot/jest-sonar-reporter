import * as path from 'path';
import getOptions from './getOptions';

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
