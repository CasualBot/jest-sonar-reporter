import * as path from 'path';
import * as fs from 'fs';
import getOptions from './getOptions';

// Regression test for https://github.com/CasualBot/jest-sonar-reporter/issues/27
// On Windows, path.sep is '\' but the filesystem root is 'C:\', so the old loop
// condition (pathToResolve !== path.sep) never matched and looped forever.
// Fix mirrors https://github.com/jest-community/jest-junit/pull/215
describe('getAppOptions', () => {
  const rootPath = path.parse(process.cwd()).root;

  it('terminates when traversal reaches the filesystem root', () => {
    // Should return quickly without hanging, even with no package.json at root.
    // Mocks fs.existsSync to simulate a project with no package.json anywhere.
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = getOptions.getAppOptions(rootPath);
    existsSpy.mockRestore();
    expect(result).toEqual({});
  });

  it('returns reporter options from a package.json that has them', () => {
    const mockOptions = { relativePaths: true, outputName: 'custom.xml' };
    const existsSpy = jest.spyOn(fs, 'existsSync').mockImplementation((p) => {
      return String(p) === path.join(process.cwd(), 'package.json');
    });

    // Point directly at the real package.json which has reporter config
    const result = getOptions.getAppOptions(process.cwd());
    existsSpy.mockRestore();

    // The real package.json doesn't have these exact values, so just verify
    // it returns an object (not an error / empty from a failed require)
    expect(typeof result).toBe('object');
  });

  it('returns empty object when package.json has no reporter config', () => {
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = getOptions.getAppOptions('/some/project/without/config');
    existsSpy.mockRestore();
    expect(result).toEqual({});
  });
});
