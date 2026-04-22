import * as path from 'path';
import { replaceRootDirInPath } from './replaceRootDirInPath';

const ROOT = '/root';
const REPORT_PATH = 'reports/output.xml';

describe('replaceRootDirInPath', () => {
  it('returns the path unchanged when it does not start with <rootDir>', () => {
    expect(replaceRootDirInPath(ROOT, REPORT_PATH)).toBe(REPORT_PATH);
  });

  it('substitutes <rootDir> with the provided root', () => {
    const result = replaceRootDirInPath(ROOT, `<rootDir>/${REPORT_PATH}`);
    expect(result).toBe(path.resolve(ROOT, REPORT_PATH));
  });
});
