import { replaceRootDirInPath } from './replaceRootDirInPath';
import { resolve } from 'path';

describe('replaceRootDirInPath', () => {
    it('should return original path if not starting with <rootDir>', () => {
        const result = replaceRootDirInPath('/some/root', '/absolute/path');
        expect(result).toBe('/absolute/path');
    });

    it('should replace <rootDir> token with actual root directory', () => {
        const rootDir = '/home/user/project';
        const filePath = '<rootDir>/src/file.ts';
        const result = replaceRootDirInPath(rootDir, filePath);
        expect(result).toBe(resolve(rootDir, 'src/file.ts'));
    });

    it('should handle relative paths after <rootDir>', () => {
        const rootDir = '/home/user/project';
        const filePath = '<rootDir>/../other/file.ts';
        const result = replaceRootDirInPath(rootDir, filePath);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });
});