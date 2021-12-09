"use strict";
exports.__esModule = true;
exports.blacklist = exports.ENV_KEY = exports.JEST_SONAR_KEY = void 0;
exports["default"] = (function (json, env) {
    if (env === void 0) { env = 'default'; }
    var jestSonarConfig = {};
    var envConfig = {};
    var allEnvConfig = mapAllEnvConfig(jestSonarConfig);
    return Object.assign(allEnvConfig, envConfig[env]);
});
exports.JEST_SONAR_KEY = 'jestSonar';
exports.ENV_KEY = 'env';
exports.blacklist = [exports.ENV_KEY];
function mapAllEnvConfig(jestSonarConfig) {
    return Object.keys(jestSonarConfig)
        .filter(function (key) { return !exports.blacklist.includes(key); })
        .reduce(function (acc, key) {
        acc[key] = jestSonarConfig[key];
        return acc;
    }, {});
}
