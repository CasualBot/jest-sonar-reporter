"use strict";
exports.__esModule = true;
var getConfig_1 = require("./getConfig");
describe('getConfig', function () {
    test('should retrieve config from JSON object', function () {
        expect.assertions(1);
        var json = {
            'jestSonar': {
                'reportPath': 'reports',
                'reportFile': 'test-report.xml',
                'indent': 4
            }
        };
        var config = (0, getConfig_1["default"])(json);
        expect(config).toMatchSnapshot();
    });
    test('should default to empty config', function () {
        expect.assertions(1);
        var json = {};
        var config = (0, getConfig_1["default"])(json);
        expect(config).toMatchSnapshot();
    });
    test('should include config for "env"', function () {
        expect.assertions(1);
        var json = {
            'jestSonar': {
                'reportPath': 'reports',
                'reportFile': 'test-report.xml',
                'indent': 4,
                'env': {
                    'test': {
                        'reportPath': 'reports-test'
                    }
                }
            }
        };
        var config = (0, getConfig_1["default"])(json, 'test');
        expect(config).toEqual({
            'reportPath': 'reports-test',
            'reportFile': 'test-report.xml',
            'indent': 4
        });
    });
});
