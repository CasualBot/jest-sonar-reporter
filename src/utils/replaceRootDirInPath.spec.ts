import * as path from 'path';
import { replaceRootDirInPath } from './replaceRootDirInPath';

describe('replaceRootDirInPath', () => {
  it('returns the path unchanged when it does not start with <rootDir>', () => {
    expect(replaceRootDirInPath('/root', 'reports/output.xml')).toBe('reports/output.xml');
  });

  it('substitutes <rootDir> with the provided root', () => {
    const result = replaceRootDirInPath('/root', '<rootDir>/reports/output.xml');
    expect(result).toBe(path.resolve('/root', 'reports/output.xml'));
  });
});
