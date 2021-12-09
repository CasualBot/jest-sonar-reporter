"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConfig = void 0;
const getDefaultConfig = (root) => {
    return {
        indent: 2,
        reportPath: root,
        reportFile: 'test-report.xml',
        sonar56x: false
    };
};
exports.getDefaultConfig = getDefaultConfig;
