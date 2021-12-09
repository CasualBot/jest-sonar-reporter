"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklist = exports.ENV_KEY = exports.JEST_SONAR_KEY = void 0;
exports.default = (json, env = 'default') => {
    const jestSonarConfig = {};
    const envConfig = {};
    const allEnvConfig = mapAllEnvConfig(jestSonarConfig);
    return Object.assign(allEnvConfig, envConfig[env]);
};
exports.JEST_SONAR_KEY = 'jestSonar';
exports.ENV_KEY = 'env';
exports.blacklist = [exports.ENV_KEY];
function mapAllEnvConfig(jestSonarConfig) {
    return Object.keys(jestSonarConfig)
        .filter(key => !exports.blacklist.includes(key))
        .reduce((acc, key) => {
        acc[key] = jestSonarConfig[key];
        return acc;
    }, {});
}
