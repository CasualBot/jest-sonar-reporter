import * as path from 'path';

export default (root: any): any => {
    return require(path.join(root, 'package.json'));
}