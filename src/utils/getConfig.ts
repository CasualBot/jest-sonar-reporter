export default (json: any, env: string = 'default'): Object => {
  const jestSonarConfig = {};
  const envConfig = {};
  const allEnvConfig = mapAllEnvConfig(jestSonarConfig);

  return Object.assign(allEnvConfig, envConfig[env])

}

export const JEST_SONAR_KEY = 'jestSonar';
export const ENV_KEY = 'env';
export const blacklist = [ENV_KEY];


function mapAllEnvConfig(jestSonarConfig: Object): Object {
  return Object.keys(jestSonarConfig)
  .filter(key => !blacklist.includes(key))
  .reduce((acc, key) => {
    acc[key] = jestSonarConfig[key]
    return acc
  }, {});
}
